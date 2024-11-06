import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CategoryContext} from "../context/CategoryContext";
import {CategoryItem} from "../types/CategoryItem";
import '../../Assets/css/AdminPage.css'

const CategoriesPage: React.FC = () => {

    const categories = useContext<CategoryItem[]>(CategoryContext);

    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string>('');
    const [editCategoryDescription, setEditCategoryDescription] = useState<string>('');

    // Function to start editing a category
    const startEdit = (category: CategoryItem) => {
        setEditCategoryId(category.id);
        setEditCategoryName(category.name);
        setEditCategoryDescription(category.description);
    };

    // Function to save the updated category
    const saveCategory = (id: number) => {
        cancelEdit();
    };

    // Function to cancel editing
    const cancelEdit = () => {
        setEditCategoryId(null);
        setEditCategoryName('');
        setEditCategoryDescription('');
    };

    return (
        <div className="container my-4">
            <div className="mb-5">
                <h2>Existing Categories</h2>
                <div className="list-container" style={{maxHeight: '800px', overflowY: 'auto'}}>
                    <ul className="list-group">
                        {categories.map(category => (
                            <li key={category.id} className="list-group-item">
                                {editCategoryId === category.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={editCategoryName}
                                            onChange={(e) => setEditCategoryName(e.target.value)}
                                            placeholder="Edit category name"
                                        />
                                        <textarea
                                            className="form-control mb-2"
                                            value={editCategoryDescription}
                                            onChange={(e) => setEditCategoryDescription(e.target.value)}
                                            placeholder="Edit category description"
                                            rows={3}
                                        />
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => saveCategory(category.id)}
                                        >
                                            Save
                                        </button>
                                        <button className="btn btn-secondary" onClick={cancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <h5>{category.name}</h5>
                                        <p>{category.description}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => startEdit(category)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default CategoriesPage;
