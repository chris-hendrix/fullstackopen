import React from 'react';

const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter: <input id='filter' onChange={onChange} value={value} />
    </div>
  );
};

export default Filter;
