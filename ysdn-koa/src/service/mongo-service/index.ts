import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const accountSchema = new Schema({
    username: String,
    password: String,
});

const userSchema = new Schema({
    account: accountSchema,
});

export default class {}
