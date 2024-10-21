import React from 'react';
import '../../Assets/css/Tabs.css';
import {SignedIn} from "@clerk/clerk-react";

const Tabs: React.FC = () => {
    return (
        <div className="container">
            <SignedIn>
                <div className="tabs">
                    <input type="radio" id="radio-1" name="tabs" defaultChecked />
                    <label className="tab" htmlFor="radio-1">Public</label>
                    <input type="radio" id="radio-2" name="tabs" />
                    <label className="tab" htmlFor="radio-2">Group</label>
                    <input type="radio" id="radio-3" name="tabs" />
                    <label className="tab" htmlFor="radio-3">Private</label>
                    <span className="glider"></span>
                </div>
            </SignedIn>
        </div>
    );
};

export default Tabs;
