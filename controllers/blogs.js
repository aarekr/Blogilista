const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('postin body:', body)
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
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  console.log('blog:', blog)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter