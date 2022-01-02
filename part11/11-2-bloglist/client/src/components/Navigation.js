import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../reducers/messageReducer';
import { logoutUser } from '../reducers/userReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const padding = { padding: 5 };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setMessage({ text: 'Successful logout', type: 'success' }));
    history.push('/');
  };

  const loginLink = () => {
    return (
      <Nav.Link href='#' as='span'>
        <Link style={padding} to='/login'>
          login
        </Link>
      </Nav.Link>
    );
  };
  const logoutButton = () => {
    return (
      <Nav.Link href='#' as='span' style={padding}>
        {user.name} logged in <Button onClick={handleLogout}>logout</Button>
      </Nav.Link>
    );
  };
  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>
                users
              </Link>
            </Nav.Link>
            {user ? logoutButton() : loginLink()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
