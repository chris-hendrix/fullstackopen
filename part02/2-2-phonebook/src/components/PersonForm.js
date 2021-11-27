import React from 'react';

const PersonForm = ({ onSubmit, onChange, name, number }) => {
  return (
    <form>
      <div>
        name: <input id='name' onChange={onChange} value={name} />
      </div>
      <div>
        number: <input id='number' onChange={onChange} value={number} />
      </div>
      <div>
        <button onClick={onSubmit} type='submit'>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
