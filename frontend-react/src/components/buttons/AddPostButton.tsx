import React from 'react';
import { Link } from 'react-router';

function AddPostButton(props: {}) {
  return (
    <Link to="/add">
      <button className="primary-btn action-btn" id="action-btn">
        + Add
      </button>
    </Link>
  );
}

export default AddPostButton;
