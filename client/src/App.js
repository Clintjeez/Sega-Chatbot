import React from 'react';
import Chatbot from './Chatbot/Chatbot';





function App() {
  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <h1>CHATBOT APP</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
     <Chatbot />

    </div>
  </div>
  );
}

export default App;
