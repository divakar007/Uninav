import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoriesPage from './CategoriesPage';
import AddCategory from "./AddCategory";
import UserVerificationList from "./UserVerificationList";


const AdminPage: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('addCategory');

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
                <h3 className="text-center py-3">Admin Panel</h3>
                <ul className="list-group list-group-flush">
                    <li
                        className={`list-group-item ${selectedSection === 'addCategory' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('addCategory')}
                    >
                        Add Category
                    </li>
                    <li
                        className={`list-group-item ${selectedSection === 'categories' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('categories')}
                    >
                        Category Management
                    </li>
                    <li
                        className={`list-group-item ${selectedSection === 'userRequests' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('userRequests')}
                    >
                        User Requests Management
                    </li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-grow-1 p-4">
                {selectedSection === 'addCategory' && (
                    <AddCategory/>
                )}
                {selectedSection === 'categories' && (
                    <CategoriesPage/>
                )
                }
                {selectedSection === 'userRequests' && (
                    <UserVerificationList/>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
