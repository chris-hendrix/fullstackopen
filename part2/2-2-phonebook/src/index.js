import ReactDOM from 'react-dom';
import App from './App.js';
import axios from 'axios';

axios
  .get('http://localhost:3001/persons')
  .then((response) => {
    const persons = response.data;
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(ReactDOM.render(<div>error loading data</div>, document.getElementById('root')));
