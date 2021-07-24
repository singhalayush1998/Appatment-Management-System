const express = require('express');
const router = express.Router();
const UsersData = require('../model/userSchema');


router.get('/', (req, res) => {
  res.status(200).send({ data: 'hello' });
});

// user registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(422)
      .json({ error: 'Please fill all the fields properly' });
  }

  try {
    const isUsernameExist = await UsersData.findOne({ username: username });

    if (isUsernameExist) {
      return res
        .status(422)
        .json({ error: 'Registration failed, username already exists' });
    }

    const isEmailExist = await UsersData.findOne({ email: email });
    if (isEmailExist) {
      return res
        .status(422)
        .json({ error: 'Registration failed, Email already exists' });
    }

    const newUser = new UsersData(req.body);
    await newUser.save();

    if (newUser) {
      res.status(201).json({ message: 'User registered successfully',data: newUser});
    } else {
      res.status(400).json({ error: 'Failed to registered' });
    }
  } catch (err) {
    console.log('error');
    res.status(500).json({ error: 'Sorry! something went wrong' });
  }
});

// user login
router.post('/login', async (req, res) => {
  const { email, username,  password } = req.body;

  const user = await UsersData.findOne(email);
  if (!user) {
    res.status(400).json({
      error:
        "User doesn't exists",
    });
  } else {
    const passwordMatch = await user.checkPassword(password)
    
    if (!passwordMatch) {
      res.status(400).json({
        error:
          'Sorry, your password was incorrect. Please double-check your password.',
      });
    } else {
      res.status(200).json({ message: 'User login successsfully', data: user });
    }
  }
});

module.exports = router;
