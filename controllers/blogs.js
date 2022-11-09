const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

const getTokenFrom = request => {
  console.log('request.get(authorization):', request.get('authorization'))
  const authorization = request.get('authorization')
  console.log('authorization:', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('blogsRouter post body:', body)
  if (!body.author) {
    return res.status(400).json({ error: 'author missing' })
  }
  if (!body.title) {
    return res.status(400).json({ error: 'title missing' })
  }
  if (body.url === undefined) {
    return res.status(400).json({ error: 'url missing' })
  }
  if (body.likes === undefined) {
    body.likes = 0
  }
  const token = getTokenFrom(req)
  console.log('token:', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('blogsRouter.post token:', token, 'decodedToken:', decodedToken)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log('blogsRouter.post user:', user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  console.log('blog:', blog)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res, next) => {
  console.log('backend blogsRouter put')
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res) => {
  console.log('backend blogsRouter.delete')
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter