const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const reqString = {
  type: String,
  required: true,
  trim: true,
};

const usersSchema = new mongoose.Schema(
    {
      username : reqString,
      email:reqString,
      password: reqString,
    }
);

usersSchema.pre("save", function(next){
  if(!this.isModified("password")) return next();
  bcrypt.hash(this.password, 8, (err, hash) => {
      if(err) return next(err)
      this.password = hash;
      next();
  })
})

usersSchema.methods.checkPassword = function(password){
  const userPassword = this.password
  return new Promise((res, rej) => {
      bcrypt.compare(password, userPassword, (err, same) => {
          if(err) return rej(err)
          res(same)
      })
  })
}

// collection creation
const UsersData = mongoose.model('user', usersSchema);

module.exports = UsersData;
