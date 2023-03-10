import UserInfo from "../models/userInfo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

// var nodemailer = require('nodemailer');

dotenv.config();

export const renderPage = (req, res, next) => {
  res.render('forgotPassword');
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('the user email - ', req.body);

        const user = await UserInfo.findOne({ email: email });
        console.log("the user found in forgot password");

        if(!user)return res.status(404).json({ message: 'User does not exist.' });

        if (!user.email) return res.status(404).json({ message: 'User does not exist.' });

        if(user.active === 'false') return res.status(404).send('User temporarly suspended!');

        const secret = process.env.SECRET_FORGOT + user.password;

        const payload = {
          email: user.email,
          id: user._id
        }

        const token = jwt.sign(payload, secret, { expiresIn: '15m' });

        const link = `http://localhost:${process.env.PORT}/api/resetpassword/${user._id}/${token}`;

        console.log(link);

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'lebiruh@gmail.com',
            pass: process.env.EMAIL_PASSWORD
          }
        });

        var mailOptions = {
          from: 'lebiruh@gmail.com',
          to: user.email,
          subject: 'Password reset',
          text: link
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
        res.status(200).json({result: "Password reset link has been sent your email address...."});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const resetPasswordLink = async (req, res) => {
    try {

      const {id, token} = req.params;

      // const _id = id;

      console.log('params are: ', req.params);
      // res.send(_id);

      const user = await UserInfo.findOne({ _id: id });
      
      console.log('user is: ', user);

      if(!user) return res.status(404).json({ message: 'User does not exist.' });


      if(id != user._id) {
        res.send('Invalid id...');
        return
      }; 

      const secret = process.env.SECRET_FORGOT + user.password;

      const payload = jwt.verify(token, secret);

      res.render('resetPassword', {email: user.email, status: "Not verified"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}; 
export const resetPassword = async (req, res) => {
    try {

      const {id, token} = req.params;
      const {password, password2} = req.body;

      if(password !== password2) {
        res.send('The passwords you entered don\'t match....');
      }

      // const _id = id;

      console.log('params are: ', req.params);
      // res.send(_id);

      const user = await UserInfo.findOne({ _id: id });

      // res.send(user);
      
      // console.log('user is: ', user);

      if(!user) return res.status(404).json({ message: 'User does not exist.' });


      if(id != user._id) {
        res.send('Invalid id...');
        return
      }; 

      const secret = process.env.SECRET_FORGOT + user.password;

      const payload = jwt.verify(token, secret);

      const hashedPassword = await bcrypt.hash(password, 12);

      await UserInfo.findByIdAndUpdate({_id:id}, {password: hashedPassword}, { new: true });

      // res.send(userWithNewPassword);

      res.render('resetPassword', {email: user.email, status: "verified"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}; 

export const changePassword = async (req, res) => {
    try {

      // const {id, token} = req.params;
      const {email, oldPassword, newPassword, confirmNewPassword} = req.body;

      // console.log('passwords are: ', req.body);
      // res.send(_id);
      const user = await UserInfo.findOne({ email: email });
      
      const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        
      if (!isPasswordCorrect) return res.status(400).send({message:'Password is not correct'});

      // const userId = user._id;

      console.log("The user for changePassword is: ", user);

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // console.log("users's ID is: ", user._id);

      // console.log("new password is: ", hashedNewPassword);

      const updatedUser = await UserInfo.findByIdAndUpdate({_id: user._id}, {password: hashedNewPassword, confirmPassword: hashedNewPassword}, { new: true });

      // console.log("updated user is: ", updatedUser);

      res.status(200).json({result: updatedUser});

       
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}; 
