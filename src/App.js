import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignUp from './signup';
import TwoColumnPage from './TwoColumnPage';

function App() {
  return (
    <Router>
      <div>
	{/* <SignUp /> */}
        <TwoColumnPage/>
      </div>
    </Router>
  );
}

export default App;
