import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>
    , 
  document.getElementById('root')
);