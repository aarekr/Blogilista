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

const mostBlogs = (blogs) => {
  let dict = {}
  let eniten_blogeja = {
    author: 'xxx',
    blogs: 0
  }
  blogs.map(item => {
    if (!(item['author'] in dict)) {
      dict[item['author']] = Number(0)
    }
    dict[item['author']] = dict[item['author']] + Number(1)
    if (dict[item['author']] > eniten_blogeja.blogs) {
      eniten_blogeja.author = item['author']
      eniten_blogeja.blogs = dict[item['author']]
    }
  })
  return eniten_blogeja
}

module.exports = {
  dummy, totalLikes, firstBlogLikes, allLikesPositive, favoriteBlog, mostBlogs
}
