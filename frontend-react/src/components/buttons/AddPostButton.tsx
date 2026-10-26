import { Link } from 'react-router';

function AddPostButton() {
  return (
    <Link to="/add">
      <button className="primary-btn action-btn" id="action-btn">
        + Add
      </button>
    </Link>
  );
}

export default AddPostButton;
