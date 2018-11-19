import React, { Component } from 'react';
import QVSTA from './Assets/QVSTA.png';
import './App.css';
import { instagramClientId, redirectUri } from './Strings';


class App extends Component {
  render() {
    let InstagramLink = `https://api.instagram.com/oauth/authorize/?client_id=${instagramClientId}&redirect_uri=${redirectUri}&response_type=token&scope=public_content `;
    return (

      <div className="App">
        <header className="App-header">
          <img src={QVSTA} className="App-logo" alt="logo" />
          <p>
            Welcome to Mohamed Assaf's Task!
          </p>
          <a
            className="App-link"
            href={InstagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Would you sign in to instagram already?
          </a>
        </header>
      </div>
    );
  }
}

export default App;
