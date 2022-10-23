const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.vhby0zp.mongodb.net/blogilista?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
/*
const blog = new Blog({
    title: 'Viktorian eka blogi',
    author: 'Viktoria',
    url: 'http://localhost:3000/api/blogs/123',
    likes: 5,
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})
*/

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log('Blog.find, blog:', blog)
  })
  mongoose.connection.close()
})