const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
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

blogsRouter.post('/', (req, res, next) => {
  const body = req.body
  console.log('postin body:', body)
  if (!body.author) {
    return res.status(400).json({ error: 'author missing' })
  }
  if (!body.title) {
    return res.status(400).json({ error: 'title missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: 'http://blogi',
    likes: 5,
  })
  console.log('blog:', blog)
  blog.save().then(savedBlog => {
    console.log('blog saved!')
    res.json(savedBlog)
  })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter