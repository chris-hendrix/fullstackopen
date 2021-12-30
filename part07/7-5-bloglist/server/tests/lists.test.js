const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

test('returns favorite blog', () => {
  const result = listHelper.favoriteBlog(helper.blogs);
  expect(result).toEqual(helper.blogs[2]);
});

test('get author with the most blogs', () => {
  const expected = { author: 'Robert C. Martin', blogs: 3 };
  const result = listHelper.mostBlogs(helper.blogs);
  expect(result).toEqual(expected);
});

test('get author with the most likes', () => {
  const expected = { author: 'Edsger W. Dijkstra', likes: 17 };
  const result = listHelper.mostLikes(helper.blogs);
  expect(result).toEqual(expected);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(helper.blogs);
    expect(result).toBe(36);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(helper.blogs);
    expect(result).toBe(36);
  });
});
