import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

function App() {
  const connection = io('http://localhost:3000',{
    query: 'quack-client',
    // path: "/"
  });
  connection.on('tweet',(data:any) =>{
    console.log(data);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
