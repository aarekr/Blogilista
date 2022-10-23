const dummy = (blogs) => {
  if (blogs.length === 0) return 1
  return 1
}

const totalLikes = (blogs) => {
  let summa = blogs.reduce((sum, blogs) => {
    return sum + blogs['likes']
  }, 0)
  return summa
}

const firstBlogLikes = (blog) => {
  return blog['likes']
}

const allLikesPositive = (blogs) => {
  let allPositive = true
  blogs.map(blog => {
    if (blog['likes'] < 0)
      allPositive = false
  })
  return allPositive
}

const favoriteBlog = (blogs) => {
  let tyk_lkm = 0
  let palautettava = {
    title: '',
    author: '',
    likes: 0
  }
  blogs.map(blog => {
    if (blog['likes'] > tyk_lkm) {
      tyk_lkm = blog['likes']
      palautettava = {
        title: blog['title'],
        author: blog['author'],
        likes: blog['likes']
      }
    }
  })
  return palautettava
}

module.exports = {
  dummy, totalLikes, firstBlogLikes, allLikesPositive, favoriteBlog
}
