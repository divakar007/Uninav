import React, {useContext, useState} from 'react';
import Button from '@mui/material/Button';
import '../../Assets/css/Favorites.css';
import {CategoryContext} from "../context/CategoryContext";

const Favorites: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const categories = useContext(CategoryContext);

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
                        <label>
                            <input
                                className="switch"
                                type="checkbox"
                                checked={subscriptions.includes(category.name)}
                                onChange={() => handleSubscriptionChange(category.name)}
                            />
                            {category.name}
                        </label>
                        <div className="item-hints">
                            <div className="hint" data-position="4">
                                <span className="hint-radius"></span>
                                <span className="hint-dot">i</span>
                                <div className="hint-content">
                                    <p>{category.description}</p>
                                </div>
                            </div>
                        </div>
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
