import React from 'react';

const Notification = ({ message, type }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const style = type === 'error' ? errorStyle : { ...errorStyle, color: 'green' };

  if (message === null) {
    return null;
  }

  if (type === 'success') {
  }
  return <div style={style}>{message}</div>;
};

export default Notification;
