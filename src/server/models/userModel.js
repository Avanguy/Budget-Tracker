const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, collation: { locale: 'en', strength: 1 } },
  email: { type: String, required: true, unique: true },
  password: { type: String },  // Optional for OAuth users
}, { timestamps: true });


userSchema.statics.signup = async function(username,email,password){
  if(!username||!email||!password){
    throw Error("All fields are required")
  }
  if(!validator.isEmail(email)){
    throw Error("Email is not valid")
  }
  
  if(!validator.isStrongPassword(password)){
    throw Error("Password not strong enough")
  }
  
  const emailExists = await this.findOne(
    { email },
    { collation: { locale: 'en', strength: 1 } }
  );
  
  if (emailExists) {
    throw new Error("Email already exists");
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
  
  const user = await this.create({username,email,password:hash})
  return user
}

userSchema.statics.login = async function(identifier, password) {
  if (!identifier || !password) {
    throw Error("All fields are required");
  }
  
  // Check if the identifier is an email
  let user;
  if (isValidEmail(identifier)) {
    user = await this.findOne({ email: identifier });
  } else {
    user = await this.findOne(
      { username: { $regex: new RegExp(`^${identifier}$`, 'i') } },
      null,
      { collation: { locale: 'en', strength: 1 } }
    ).select('username email password active_skin');
  }
  if (!user) {
    throw Error("Invalid login credentials");
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid login credentials");
  }
  
  return user;
};


function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const User = mongoose.model('User', userSchema);
module.exports = User;