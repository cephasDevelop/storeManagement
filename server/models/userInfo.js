import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min:1,
        max:15,
    },
    lastName: {
        type: String,
        required: true,
        min:1,
        max:15,
    },
    department: {
        type: String,
        required: true,
        max:15,
    },
    company: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max:20,
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max:15,
    },
    confirmPassword: {
        type: String,
    },
    active: {
        type: String,
        default: true,
    },
    startedOn: {
        type: String,
        default: new Date().toISOString(),
    }
});

const UserInfo = mongoose.model('UserInfo', UserSchema);

export default UserInfo;