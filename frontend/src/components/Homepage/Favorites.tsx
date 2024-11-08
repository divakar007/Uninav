import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../../Assets/css/Favorites.css';

const Favorites: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const categories = [
        { name: 'Social Events', description: 'Social Events Description' },
        { name: 'Academic Events', description: 'Academic Events Description' },
        { name: 'Career Fairs & Networking', description: 'Career Fairs & Networking Description' },
        { name: 'Sports and Recreation', description: 'Sports and Recreation Description' },
        { name: 'Workshops & Training', description: 'Workshops & Training Description' },
        { name: 'Campus Alerts', description: 'Campus Alerts Description' },
        { name: 'Announcements', description: 'Announcements Description' },
        { name: 'Transportation & Parking', description: 'Transportation & Parking Description' },
        { name: 'Giveaways & Promotions', description: 'Giveaways & Promotions Description' },
        { name: 'Other', description: 'Other Description' }
    ];

    const handleSubscriptionChange = (category: string) => {
        setSubscriptions(prevSubscriptions =>
            prevSubscriptions.includes(category)
                ? prevSubscriptions.filter(sub => sub !== category)
                : [...prevSubscriptions, category]
        );
        setIsChanged(true);
    };

    const handleSaveChanges = () => {
        // Save changes logic here
        console.log('Changes saved:', subscriptions);
        setIsChanged(false);
    };

    return (
        <div className="subscriptions-page">
            <h1>Manage Your Subscriptions</h1>
            <ul className="categories-list">
                {categories.map(category => (
                    <li key={category.name} className="category-item">
                        <div className="item-hints">
                            <div className="hint" data-position="4">
                                <span className="hint-radius"></span>
                                <span className="hint-dot">i</span>
                                <div className="hint-content">
                                    <p>{category.description}</p>
                                </div>
                            </div>
                        </div>
                        <label>
                            <input
                                className="switch"
                                type="checkbox"
                                checked={subscriptions.includes(category.name)}
                                onChange={() => handleSubscriptionChange(category.name)}
                            />
                            {category.name}
                        </label>
                    </li>
                ))}
            </ul>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                disabled={!isChanged}
            >
                Save Changes
            </Button>
        </div>
    );
};

export default Favorites;