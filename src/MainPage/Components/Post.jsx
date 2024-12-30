import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../CSS/Post.css';
function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeToggle = async () => {
    setIsLiking(true);
    const token = Cookies.get('auth_token');
    const url = `http://localhost:8000/api/users/${post.author.username}/posts/${post.id}/like`;

    try {
      if (isLiked) {
        // Видалення лайка
        await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setLikes((prev) => prev - 1);
        setIsLiked(false);
      } else {
        // Додавання лайка
        await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Помилка при зміні стану лайка:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="card">
      <Link to={`/post/${post.author.username}/${post.id}`} className="card-body">
        <h5 className="card-title">{post.author.full_name}</h5>
        <h6 className="card-subtitle">@{post.author.username} • {new Date(post.created_at).toLocaleString('uk-UA')}</h6>
        <p className="card-text">{post.content}</p>
      </Link>
      <div className="card-footer">
        <span>Лайків: {likes}</span>
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
          disabled={isLiking}
        >
          {isLiked ? 'Забрати лайк' : 'Лайк'}
        </button>
      </div>
    </div>
  );
}

export default Post;