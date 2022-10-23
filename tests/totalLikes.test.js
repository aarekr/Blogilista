const listHelper = require('../utils/list_helper')

describe('total likes test', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    }
  ]

  test('totalLikes in the list', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(29)
  })

  test('totalLikes value not negative', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBeGreaterThan(0)
  })

  test('first blog has 7 likes', () => {
    const result = listHelper.firstBlogLikes(blogs[0])
    expect(result).toBe(7)
  })

  test('all blog likes 0 or greater', () => {
    const result = listHelper.allLikesPositive(blogs)
    expect(result).toBe(true)
  })
})