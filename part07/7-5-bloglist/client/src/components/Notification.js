import React from 'react';

const Notification = ({ text, type }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!text) return null;

  const style = type === 'error' ? errorStyle : { ...errorStyle, color: 'green' };

  if (type === 'success') {
  }
  return <div style={style}>{text}</div>;
};

export default Notification;
