import React from 'react';
import PostEventForm from "./PostEventForm";
import What3WordsMapComponent from "./What3WordsMapComponent";
import "../../Assets/css/PostEvent.css";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";

const PostEvent: React.FC = () => {
    return (
        <div className="post-event-container">
            <SignedIn>
                <div className="map-component-container">
                    <What3WordsMapComponent/>
                </div>
                <div className="post-event-form-container">
                    <PostEventForm/>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn/>
            </SignedOut>
        </div>
    );
};

export default PostEvent;
