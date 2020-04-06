import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Select } from '@rmwc/select';

function App() {
  return (
    <div className="App">
      <Select
        value="true"
        options={['true', 'false']}
        onChange={(e) => console.log('onChange', e)}
      />
    </div>
  );
}

export default App;
