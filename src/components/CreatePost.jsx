import React, { useEffect } from 'react';
import { useState } from 'react';
import './CSS/CreatePost.css';
import Header from '../MainPage/Components/Header';
import Footer from '../MainPage/Components/Footer';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
     useEffect(() => {
         const fetchMe = async () => {
         const token = Cookies.get('auth_token');
         try {
           const response = await fetch('http://localhost:8000/api/me', {
             method: 'GET',
             headers: {
               'Authorization': `Basic ${token}`,
             },
           });
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
       
           const data = await response.json();
           
           console.log(data);
            setUser(data.username);

         } catch (error) {
           console.error('Error fetching data:', error);
         }
       };
        fetchMe();
     }, []);
     const handleSubmit = async (e) => {
      e.preventDefault();


      const token = Cookies.get('auth_token');
      try {
          const response = await fetch(`http://localhost:8000/api/users/${user}/posts`, {
              method: 'POST',
              headers: {
                  'Authorization': `Basic ${token}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ content }),
          });

          if (!response.ok) {
              throw new Error('Failed to create post');
          }
          
          const data = await response.json();
          console.log('Post created:', data);
          navigate(`/profile/${user}`);
          // Redirect to profile or another page after successful post creation
      } catch (err) {
          console.error('Error:', err);
      }
  };
  return (
    <>
      <Header />
      <div className="CreatePost">
            <h1>Cтворити пост:</h1>
            <div className='create-post-form'>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="content">Текст посту</label>
              <textarea
                id="content"
                className={`form-control ${content.length > 140 ? 'border-danger' : ''}`}
                rows="6"
                maxLength="140"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  
                }}
                placeholder="Поділіться своїми думками..."
              />
              <div className="form-footer">
                <small className={`text-muted ${content.length > 140 ? 'text-danger' : ''}`}>
                  {140 - content.length} символів залишилось
                </small>
                
              </div>
            </div>
            <button type="submit" className="submit-button" disabled={content.length === 0 || content.length > 140}>
                Опублікувати
            </button>
          </form>

            </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
