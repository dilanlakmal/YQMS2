import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Details from './pages/Details';
import Inspection from './pages/Inspection';
import Profile from './pages/Profile';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const [inspectionState, setInspectionState] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/details" element={<Details />} />
                <Route 
                  path="/inspection" 
                  element={
                    <Inspection 
                      savedState={inspectionState} 
                      onStateChange={setInspectionState} 
                    />
                  } 
                />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;