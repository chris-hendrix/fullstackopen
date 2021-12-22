const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, obj) => acc + obj.likes;
  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
