import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Instaform from './components/Instaform';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">QVTSA-Demo</h1>
        </header>
        <div className="container">
            <div className="row">
                    <div className="App-intro">
                        <Instaform/>
                        <a href="https://www.instagram.com/oauth/authorize/?client_id=81769697b55e450d9527b3ffa60c2447&redirect_uri=https://thespacecadet.github.io/qvtsa-demo/&response_type=token">Login</a>
                    </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
