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
    startedOn: {
        type: String,
        default: new Date().toISOString(),
    }
});

const UserInfo = mongoose.model('UserInfo', UserSchema);

export default UserInfo;