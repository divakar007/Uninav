import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useUser} from "@clerk/clerk-react";
import axios from "axios";

interface settingPageProps {
    sendFormStatusToSettingsPage: (data: string) => void;
}
const UserVerificationForm: React.FC<settingPageProps> = ({ sendFormStatusToSettingsPage }) => {

    const {user, } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        idImage: null as File | null,
        imagePreview: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData({
                ...formData,
                [name]: file,
                imagePreview: URL.createObjectURL(file)
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const uploadImageToServer = async (file: File): Promise<string> => {
        try {
            const fileData = new FormData();
            fileData.append('file', file);

            const response = await axios.post('/s3/upload', fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.fileUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let fileUrl = '';
            if (formData.idImage) {
                fileUrl = await uploadImageToServer(formData.idImage);
            }

            const requestBody = {
                userId: user?.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                verificationDocumentUrl: fileUrl,
                isBlocked: false
            };

            const response = await axios.post('/user/verification-request', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'success') {
                alert('Form submitted successfully!');
                sendFormStatusToSettingsPage("success");
            } else if (response.data.status === 'request-already-exists') {
                alert('A verification request already exists.');
                sendFormStatusToSettingsPage("success");
            } else {
                alert('There was an issue with the submission.');
            }

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form.');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-between my-5">
            {/* Form Section */}
            <div className="card shadow p-4" style={{ flex: '1', maxWidth: '500px' }}>
                <h2 className="mb-3">User Verification</h2>
                <p className="text-muted">Please provide your details to verify your identity.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="idImage" className="form-label">Upload ID Proof</label>
                        <input
                            type="file"
                            id="idImage"
                            name="idImage"
                            className="form-control"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                        {formData.imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={formData.imagePreview}
                                    alt="ID Proof"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px' }}
                                />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>

            {/* Information Section */}
            <div className="ms-4" style={{ flex: '1', maxWidth: '500px' }}>
                <div className="card p-4 border-0 bg-light">
                    <h5 className="text-primary">Untitled UI</h5>
                    <p>
                        This is an example of how user information can be verified to maintain
                        security and integrity. It’s essential for platforms requiring sensitive user
                        information to manage it with utmost care and efficiency.
                    </p>
                    <blockquote className="blockquote">
                        <p className="mb-0">“Ensuring user identity helps build trust and secure interactions on any platform.”</p>
                        <footer className="blockquote-footer">Maya Rothwell, <cite title="Source Title">Founder & CEO</cite></footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default UserVerificationForm;
