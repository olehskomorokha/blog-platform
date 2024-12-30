import '../CSS/LoginSignUp.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSingUp = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");

    const submit = async () => {
        let user = {
            username: document.getElementById('nameInput').value,
            password: document.getElementById('passwordInput').value,
            full_name: document.getElementById('lastnameInput').value
            
        };

        try {
            let response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert('User registered successfully');
                navigate("/");
            } else if (response.status === 409) {
                alert('Username already taken');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error registering user');
        }
    };

    const login = async () => {
        let user = {
            username: document.getElementById('nameInput').value,
            password: document.getElementById('passwordInput').value,
        };
        const encodedCredentials = btoa(`${user.username}:${user.password}`);
        try {
            let response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            Cookies.set('auth_token', encodedCredentials, { expires: 7 });
            if (response.ok) {
                alert('Login successful');
                navigate("/");
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in');
        }
    };

    return (
        <div className='header-container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action === "Login" ? null : (
                    <div className='input'>
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Full Name' id="lastnameInput" />
                    </div>
                )}
                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input type="text" placeholder='Username' id="nameInput" />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' id="passwordInput" />
                </div>
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            )}
            <div className='submit-container'>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                <button id="submitBtn" type="submit" onClick={action === "Login" ? login : submit}>Submit</button>
            </div>
        </div>
    );
};

export default LoginSingUp;