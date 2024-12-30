import LoginSignUp from './Authentication/Components/LoginSignUp';
import Main from './MainPage/Components/Main';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
