const dummy = (blogs) => {
  return blogs.length === 1 ? 1 : 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, obj) => acc + obj.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (maxobj, obj) => (obj.likes > maxobj.likes ? obj : maxobj);
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return;
  const authors = {};
  let maxBlogs = 0;
  let maxAuthor = '';

  blogs.forEach((blog) => {
    if (!(blog.author in authors)) authors[blog.author] = 0;
    authors[blog.author] += 1;
    if (authors[blog.author] > maxBlogs) {
      maxAuthor = blog.author;
      maxBlogs = authors[blog.author];
    }
  });
  return { author: maxAuthor, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return;
  const authors = {};
  let maxLikes = 0;
  let maxAuthor = '';

  blogs.forEach((blog) => {
    if (!(blog.author in authors)) authors[blog.author] = 0;
    authors[blog.author] += blog.likes;
    if (authors[blog.author] > maxLikes) {
      maxAuthor = blog.author;
      maxLikes = authors[blog.author];
    }
  });
  return { author: maxAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
