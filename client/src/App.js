import React from 'react';
import './App.css';
import VideoChat from './component/VideoChat';

const App = () => {
  return (
    <div className="app">
    <header>
      <h1>Video Chat with Hooks</h1>
    </header>
    <main>
      {/* <p>VideoChat goes here.</p>
       */}
       <VideoChat/>
    </main>
    <footer>
      <p>
        Made with{' '}
        <span role="img" aria-label="React">
          ⚛
        </span>{' '}
        by <a href="https://github.com/satyamtomar">satyamtomar</a>
      </p>
    </footer>
  </div>
  );
};

export default App;
