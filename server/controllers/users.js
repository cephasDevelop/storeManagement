import UserInfo from "../models/userInfo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();
export const login = async (req, res) => {
    try {
        const { firstName, department, email, password } = req.body;
        console.log('the requested data - ', req.body);

        const user = await UserInfo.findOne({ department: department, email: email, firstName: firstName });
        if (!user.department) return res.status(404).json({ message: 'User does not exist.' });
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
        // console.log(items);
        res.status(200).json(users);
        // res.status(200).send(items);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};
