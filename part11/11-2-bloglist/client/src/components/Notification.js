import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const { text, type } = useSelector((state) => state.message);

  if (!text) return null;

  const style = type === 'error' ? errorStyle : { ...errorStyle, color: 'green' };

  if (type === 'success') {
  }
  return <div style={style}>{text}</div>;
};

export default Notification;
