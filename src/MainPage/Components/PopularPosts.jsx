import React from 'react';
import Post from './Post';
import '../CSS/PopularPosts.css';
function PopularPosts({ posts }) {
  return (
    <section className="last-posts-container">
      <h3 id="lastPostsText">Останні пости</h3>
      <div className="latest-posts">
        {posts.map((post) => (
          <div key={post.id} className="main-post">
            <Post post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularPosts;
