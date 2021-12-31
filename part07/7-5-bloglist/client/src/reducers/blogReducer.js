import blogService from '../services/blogs';

const GET_BLOGS = 'GET_BLOGS';
const GET_USER_BLOG_MAP = 'GET_USER_BLOG_MAP';
const CREATE_BLOG = 'CREATE_BLOG';
const UPDATE_BLOG = 'UPDATE_BLOG';
const DELETE_BLOG = 'DELETE_BLOG';
const SET_BLOG_ERROR = 'SET_BLOG_ERROR';
const ADD_COMMENT = 'ADD_COMMENT';

const initialState = {
  blogs: [],
  userBlogMap: {},
  error: null,
};

const blogReducer = (state = initialState, action) => {
  const blogs = state.blogs;
  switch (action.type) {
    case GET_BLOGS:
      return { ...state, blogs: action.data };
    case GET_USER_BLOG_MAP:
      return { ...state, userBlogMap: action.data };
    case CREATE_BLOG:
      return { ...state, blogs: blogs.concat(action.data) };
    case UPDATE_BLOG:
    case ADD_COMMENT:
      const updatedBlog = action.data;
      return { ...state, blogs: blogs.map((b) => (updatedBlog._id === b._id ? updatedBlog : b)) };
    case DELETE_BLOG:
      const deletedBlog = action.data;
      return { ...state, blogs: blogs.filter((b) => b._id !== deletedBlog._id) };
    case SET_BLOG_ERROR:
      return { ...state, error: action.data };
    default:
      return state;
  }
};

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({ type: GET_BLOGS, data: blogs });
};

export const createBlog = (blog) => async (disptach) => {
  const savedBlog = await blogService.create(blog);
  disptach({ type: CREATE_BLOG, data: savedBlog });
  disptach({ type: GET_USER_BLOG_MAP });
};

export const updateBlog = (blog) => async (disptach) => {
  try {
    const updatedBlog = await blogService.update(blog._id, blog);
    disptach({ type: UPDATE_BLOG, data: updatedBlog });
  } catch (error) {
    disptach({ type: SET_BLOG_ERROR, data: 'invalid update' });
  }
};

export const deleteBlog = (blog) => async (dispatch) => {
  try {
    await blogService.deleteOne(blog._id);
    dispatch({ type: DELETE_BLOG, data: blog });
  } catch (error) {
    dispatch({ type: SET_BLOG_ERROR, data: 'invalid credentials' });
  }
};

export const setBlogError = (error) => (dispatch) => {
  dispatch({ type: SET_BLOG_ERROR, data: error });
};

export const getUserBlogMap = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  const map = {};
  blogs.forEach((blog) => {
    if (!blog.user) return;
    const userId = blog.user._id;
    if (!(userId in map)) map[userId] = { user: blog.user, blogs: [] };
    map[userId].blogs.push(blog);
  });
  dispatch({ type: GET_USER_BLOG_MAP, data: map });
};

export const addBlogComment = (blog, comment) => async (dispatch) => {
  const updatedBlog = await blogService.addComment(blog._id, comment);
  dispatch({ type: ADD_COMMENT, data: updatedBlog });
};

export default blogReducer;
