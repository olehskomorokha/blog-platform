import React from 'react';
import { FaUsers, FaRegNewspaper, FaRegThumbsUp, FaComments, FaRocket } from 'react-icons/fa';

import '../CSS/AboutUs.css'; 

const AboutUs = () => {
  return (
    <section className="about-us">
      <h3 className="about-us-title">
        Про нашу платформу <FaRocket className="icon-warning" />
      </h3>
      <p className="about-us-description">
        Створено <span className="highlight">TechHub</span> для тих, хто хоче ділитися ідеями, знаходити цікаві статті та спілкуватися з іншими ентузіастами. 🚀
      </p>

      <div className="features">
        <div className="feature-card">
          <div className="card-body">
            <FaUsers size={40} className="icon-primary" />
            <h5 className="card-title">Спільнота</h5>
            <p className="card-text">
              Приєднуйтесь до нашої активної спільноти та обмінюйтесь досвідом! 🤝
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-body">
            <FaRegNewspaper size={40} className="icon-success" />
            <h5 className="card-title">Читайте статті</h5>
            <p className="card-text">
              Відкривайте нові цікаві матеріали та статті від експертів. 📚
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-body">
            <FaRegThumbsUp size={40} className="icon-danger" />
            <h5 className="card-title">Оцінюйте контент</h5>
            <p className="card-text">
              Ваша думка важлива! Оцінюйте контент та підтримуйте авторів. 👍
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-body">
            <FaComments size={40} className="icon-info" />
            <h5 className="card-title">Обговорюйте</h5>
            <p className="card-text">
              Ставте запитання та обговорюйте ідеї з іншими користувачами. 💬
            </p>
          </div>
        </div>
      </div>

      <p className="about-us-footer">
        Приєднуйтесь до нас і отримуйте максимальну вигоду від співпраці!{' '}
        <FaRocket className="icon-warning" />!
      </p>
    </section>
  );
}

export default AboutUs;
