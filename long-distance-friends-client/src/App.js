import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import NavPublic from './components/NavPublic';
import LoginForm from './components/LoginForm';
import Index from './components/Index';
import { useState } from "react";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <h2>Your Friend Groups</h2>
    </div>
  )
}

const NoMatch = () => {
  return (
    <div>
      <h1>Looks like something went wrong.</h1>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <NavPublic />
        </div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
