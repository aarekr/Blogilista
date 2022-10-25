const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  console.log('user post:', username, name, password)
  console.log('user post pituudet:', username.length, password.length)
  if (username === undefined || username === '' || username.length < 3) {
    return response.status(400).json({ error: 'username not valid' })
  }
  if (password === undefined || password === '' || password.length < 3) {
    return response.status(400).json({ error: 'password not valid' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter