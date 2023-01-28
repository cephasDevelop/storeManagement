import UserInfo from "../models/userInfo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
export const login = async (req, res) => {
    try {
        const { firstName, department, email, password } = req.body;
        console.log('the requested data - ', req.body);

        const user = await UserInfo.findOne({ department: department, email: email, firstName: firstName });
        if (!user.department) return res.status(404).json({ message: 'User does not exist.' });
        if(user.active === 'false') return res.status(404).json({ message: 'User temporarly suspended.' });
        console.log('found the user fron DB - ', user);
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect)return res.status(400).json({message:'Password not correct'});
        
        const token = jwt.sign({
            name: `${user.firstName}${user.lastName}`,
            department: user.department, id: user._id
        }, process.env.SECRET_TOKEN, { expiresIn: '4h' });
        
        // NOTE USER HAS A PASSWORD IN IT. PASSWORD SHALL NOT BE SENT TO THE FRONTEND
        res.status(200).json({result:user,token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const signUpAdmin = async (req, res) => {
    try {
        const { firstName, lastName, department, email, password, confirmPassword } = req.body;
        console.log('req.body = ', req.body);
        const existingUser = await UserInfo.find({ department: department, email: email, firstName: firstName, lastName: lastName });
        
        if (existingUser.department) return res.status(400).json({ message: 'User already exists.' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Please confirm password' });
        const hashedPassword = await bcrypt.hash(password, 12);
        
        let result = new UserInfo({
            firstName, lastName, confirmPassword: hashedPassword,
            department, email, password: hashedPassword
        });
        result = await result.save();
        
        const token = jwt.sign({
            name: `${result.firstName}${result.lastName}`,
            department: result.department, id: result._id
        }, process.env.SECRET_TOKEN, { expiresIn: '4h' });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserInfo.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

export const updateUserStatus = async (req, res) => { 
    try {
        console.log('request.params = ',req.params);
        console.log('request.body = ',req.body);
        console.log('request.query = ',req.query);
        const id = req.params.id;
        const { active } = req.body;
        // const id = req.query;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

        const updatedUser = await UserInfo.findByIdAndUpdate({_id:id}, {active:active}, { new: true });
        console.log('Updated Used Data - ',updatedUser)
        res.status(200).json(updatedUser);        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
    
};

export const userDelete = async (req, res) => {
    try {
        console.log('Delete Function Controllers');
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // console.log('id not from mongodb');
            return res.status(404).send('No user with that id');
        }
        // console.log('id is from mongodb');
        const existingUser = await UserInfo.find({ _id: id});
        
        if (!existingUser) {
            // console.log('found existing user');
            return res.status(400).json({ message: 'User does not exists.' });
        }

        const deletedUser = await UserInfo.findByIdAndRemove({_id:id});
        console.log('Updated Used Data - ', deletedUser);
        
        res.status(200).json('user deleted');        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}