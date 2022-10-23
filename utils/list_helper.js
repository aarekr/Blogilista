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
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i]['likes'] < 0) {
      allPositive = false
    }
  }
  return allPositive
}

module.exports = {
  dummy, totalLikes, firstBlogLikes, allLikesPositive
}
