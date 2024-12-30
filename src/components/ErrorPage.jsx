import React from "react";
import './CSS/ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="error-container">
            <h1 className="error-title">Щось пішло не так!</h1>
            <p className="error-message">Ми не змогли знайти сторінку, яку ви шукали. Спробуйте ще раз пізніше або поверніться на головну сторінку.</p>
            <a href="/" className="error-link">Повернутися на головну</a>
        </div>
    );
};

export default ErrorPage;