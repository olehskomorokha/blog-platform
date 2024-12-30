import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import '../CSS/Header.css';
const Header = () =>{
    const [username, setUsername] = useState(null);
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
          setUsername(data.username);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
        fetchMe();
    }, []);
    
    const handleLogout = async () => {
      await Cookies.remove('auth_token');
  };
    const token = Cookies.get('auth_token');
    return (
        <div className="Header">
          {/* Іконка TechHub з текстом */}
          <div className="logo">
                    <FaRocket size={30} className="icon-warning" />
                    <Link to="/" className="header-title">
                        blog-platform
                    </Link>
                </div>
            <div className="buttons">
              
                
                {token ? (     
                  <>
                    <Link to="/create-post" className="button">
                      Створити пост
                    </Link>
                    <Link to={`/profile/${username}`} className="button">
                        Мій профіль
                    </Link>
                    <Link onClick={handleLogout} to="/login" className="Logout-button">
                      Вийти
                    </Link>
                  </>        
                  
                ) : (
                    <Link to="/login" className="button">
                        Логін/Регестрація
                    </Link>
                )}

            </div>
        </div>
    )
}
export default Header