import React, { useState } from 'react';

const Edit = () => {
    const [data, setData] = useState('');

    const handleInputChange = (e) => {
        setData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the form submission
        console.log('Form submitted:', data);
    };

    return (
        <div>
            <h2>Edit Component</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Edit Data:
                    <input type="text" value={data} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Edit;