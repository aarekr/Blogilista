const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// <password>
const url = `mongodb+srv://fullstack:<password>@cluster0.vhby0zp.mongodb.net/blogilista?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

app.get('/', (req, res) => {
  res.send('<h1>Hello Blogilista</h1>')
})

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

app.get('/api/blogs/:id', (req, res) => {
  Blog.findById(req.params.id).then(blog => {
    res.json(blog)
  })
})

app.post('/api/blogs', (req, res) => {
    const body = req.body
    console.log("postin body:", body)
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
    console.log("blog:", blog)
    blog.save().then(savedBlog => {
      console.log('blog saved!')
      res.json(savedBlog)
    })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})