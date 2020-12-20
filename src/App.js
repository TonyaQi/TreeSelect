import React from 'react';
import logo from './logo.svg';
import TreeSelect from './TreeSelect';
import './App.css';
import data from './data.json'
import 'antd/dist/antd.css';

function App() {
  console.log('app', data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TreeSelect
            data={data}
            value={['0-0']}
            type={'SHOW_CHILD'}
        />
      </header>
    </div>
  );
}

export default App;
