import LoginSignUp from './Authentication/Components/LoginSignUp';
import Main from './MainPage/Components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
