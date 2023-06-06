import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const admin = new Schema({
  
    email: { type: String },
    password: { type: String },
  
});

export default mongoose.model('adminlogin', admin);
