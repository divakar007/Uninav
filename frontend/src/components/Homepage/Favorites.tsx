import React, { useState } from 'react';
import '../../Assets/css/Favorites.css';

const Favorites: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<string[]>([]);

    const categories = [
        'Social Events',
        'Academic Events',
        'Career Fairs & Networking',
        'Sports and Recreation',
        'Workshops & Training',
        'Campus Alerts',
        'Announcements',
        'Transportation & Parking',
        'Giveaways & Promotions',
        'Other'
    ];

    const handleSubscriptionChange = (category: string) => {
        setSubscriptions(prevSubscriptions =>
            prevSubscriptions.includes(category)
                ? prevSubscriptions.filter(sub => sub !== category)
                : [...prevSubscriptions, category]
        );
    };

    return (
        <div className="subscriptions-page">
            <h1>Manage Your Subscriptions</h1>
            <ul className="categories-list">
                {categories.map(category => (
                    <li key={category} className="category-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={subscriptions.includes(category)}
                                onChange={() => handleSubscriptionChange(category)}
                            />
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;