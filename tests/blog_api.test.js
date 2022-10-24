const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Dijkstra`s blog is included', async () => {
  const response = await api.get('/api/blogs')
  const authors = response.body.map(r => r.author)
  expect(authors).toContainEqual('Edsger W. Dijkstra')
})

test('there is a blog about React', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContainEqual('React patterns')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Nothing functions',
    author: 'Aare',
    url: 'http://localhost:3003/blogilista',
    likes: 2,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Nothing functions')
})

test('a blog with likes value 0 is added', async () => {
  const newBlog = {
    title: 'This blogs has no likes',
    author: 'Aare',
    url: 'http://localhost:3003/blogilista',
    // likes ei saa arvo
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const all_likes = response.body.map(r => r.likes)
  expect(all_likes[all_likes.length-1]).toBe(0)
})

test('a blog without title is not added', async () => {
  const newBlog = {
    title: '',
    author: 'Aare',
    url: 'http://localhost:3003/blogilista',
    likes: 2,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a blog without url is not added', async () => {
  const newBlog = {
    title: 'This blog has no URL',
    author: 'Aare',
    // url ei saa arvoa
    likes: 2,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})