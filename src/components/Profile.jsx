import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../MainPage/Components/Header';
import Footer from '../MainPage/Components/Footer';
import Cookies from 'js-cookie';
import { RiGroupLine, RiUserFollowLine, RiFileTextLine, RiErrorWarningLine, RiMessage2Line } from 'react-icons/ri';
import './CSS/Profile.css';

function Profile() {
    const [user, setUser] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const { username } = useParams();

    useEffect(() => {
        const getUserInfo = async (username) => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        getUserInfo(username);

        const getUserPosts = async (username, page = 1) => {
            const token = Cookies.get('auth_token');
            try {
                const response = await fetch(`http://localhost:8000/api/users/${username}/posts?page=${page}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getUserPosts(username);
    }, [username]);

    const handleLike = async (id, isLiked, event) => {
        
        const token = Cookies.get('auth_token');
        try {
            const method = isLiked ? 'DELETE' : 'PUT';
            const url = `http://localhost:8000/api/users/${username}/posts/${id}/like`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(isLiked ? 'Failed to unlike post' : 'Failed to like post');
            }

            const updatedPost = await response.json();
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                )
            );
            event.preventDefault();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString('uk-UA', options);
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                {user ? (
                    <div className="profile-content">
                        <div className="profile-card">
                            <div className="profile-info">
                                <div className="avatar-section">
                                    <img
                                        src={user.avatar || 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex'}
                                        alt="Аватар користувача"
                                        className="avatar"
                                    />
                                    {user.full_name && <h5 className="name">{user.full_name}</h5>}
                                    <p className="username">@{user.username}</p>
                                </div>
                                <div className="stats">
                                    <p>
                                        <RiGroupLine className="icon" />
                                        Підписники: <strong>1423</strong>
                                    </p>
                                    <p>
                                        <RiUserFollowLine className="icon" />
                                        Підписки: <strong>233</strong>
                                    </p>
                                    <p>
                                        <RiFileTextLine className="icon" />
                                        Пости: <strong>{user.posts}</strong>
                                    </p>
                                </div>
                                <div className="profile-buttons">
                                    <button className="btn follow-btn">
                                        <RiUserFollowLine className="icon" /> Підписатися
                                    </button>
                                    <button className="btn message-btn">
                                        <RiMessage2Line className="icon" /> Написати
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="posts-section">
                            <h4 className="posts-title">Пости</h4>
                            {posts.length > 0 ? (
                                <div className="posts-list">
                                    {posts.map((post) => (
                                        
                                        <div className="post-card" key={post.id}>
                                            <div className="post-card-body">
                                                <div className="post-author">
                                                    <h5 className="post-title">{post.author.full_name}</h5>
                                                    <p className="post-username">@{post.author.username}</p>
                                                </div>
                                                <h3 className="post-content">{post.content}</h3>
                                                <p className="post-time">{formatDate(post.created_at)}</p>
                                            </div>
                                            <div className="post-footer">
                                                <button
                                                    className={`like-btn ${post.is_liked ? 'liked' : ''}`}
                                                    onClick={(event) => handleLike(post.id, post.is_liked, event)}
                                                >
                                                    ❤️ {post.likes}
                                                   
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-posts">Немає доступних постів.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="user-not-found">
                        <RiErrorWarningLine size={120} color="#aaa" />
                        <h4 className="text-muted">
                            {`Користувача з ім'ям @johndoe2024 не знайдено.`}
                        </h4>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Profile;
