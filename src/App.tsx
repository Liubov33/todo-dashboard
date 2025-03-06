import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './styles/App.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
