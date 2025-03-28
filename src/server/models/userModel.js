import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, collation: { locale: 'en', strength: 1,required:true } },
  password: { type: String, required: true },  
}, { timestamps: true });


userSchema.statics.signup = async function(username,password){
  if(!username||!password){
    throw Error("All fields are required")
  }
  
  if(!validator.isStrongPassword(password)){
    throw Error("Password not strong enough")
  }
  
  const userExists = await this.findOne(
    { username:{ $regex: new RegExp('^' + username + '$', 'i') } },
    { collation: { locale: 'en', strength: 1 } }
  );
  
  if (userExists) {
    throw new Error("Username already exists");
  }
  

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  
  const user = await this.create({username,password:hash})
  return user
}

userSchema.statics.login = async function(identifier, password) {
  console.log(identifier,password)
  if (!identifier || !password) {
    throw Error("All fields are required");
  }
  
  // Check if the identifier is an email
  let user;
  user = await this.findOne(
    { username: { $regex: new RegExp(`^${identifier}$`, 'i') } },
    null,
    { collation: { locale: 'en', strength: 1 } }
  ).select('username password');
  if (!user) {
    throw Error("Invalid login credentials");
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid login credentials");
  }
  
  return user;
};

export default mongoose.model('User', userSchema);
