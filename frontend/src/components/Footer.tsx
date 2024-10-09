import React from 'react';

export default function Footer(){
    return (
        <footer className="bg-light text-center text-lg-start mt-auto py-3">
            <div className="container d-flex justify-content-between">
                <span>© 2024 UniNav. All rights reserved.</span>
                <div>
                    <a href="https://www.facebook.com" className="me-3" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="mailto:someone@example.com" className="me-3" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-envelope"></i>
                    </a>
                    <a href="https://www.twitter.com" className="me-3" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
