import blogService from '../services/blogs';

const GET_BLOGS = 'GET_BLOGS';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS:
      return action.data;
    case 'CREATE_BLOG':
      break;
    case 'UPDATE_BLOG':
      break;
    case 'DELETE_BLOG':
    default:
      return state;
  }
};

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({ type: GET_BLOGS, data: blogs });
};

export default blogReducer;
