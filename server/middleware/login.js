import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res, next) => {
    try {
        const head = req.headers.Authorization;
        console.log('req.headers.Authorization = > ',head);
        console.log("head.split(' ') = > ",head.split(' '));
        const token = req.headers.Authorization.startsWith('Bearer').split(' ')[1];
        // const token = req.headers.Authorization.split(" ")[1];
        console.log('MIDDLEWARE TOKEN FROM HEARERS');
        console.log("req.headers => ",req.headers);
        let decodedToken;
        if (token) {
            decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
            req.userId = decodedToken?.id;
        }
        next();
    } catch (error) {
        console.log('LOGIN MIDDLEWARE ERROR');
        console.log(error.message);
    }
}
export default login;