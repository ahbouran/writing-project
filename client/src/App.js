import './App.css';
import { useState } from 'react';
const axios = require('axios');

function App() {
  const [state, setState] = useState();

  axios.get('http://localhost:9000/concept')
  .then(res => setState(res.data))
  .catch(e => console.log('error here,', e))

  return (
    <div>
      {state}
    </div>
  );
}

export default App;
