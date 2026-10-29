import { Link } from 'react-router';
import type { IAction } from '../../utils/actions';
import PublishButton from './PublishButton';

function EditButtons(props: IAction) {
  return (
    <>
      <PublishButton action={props.action}></PublishButton>
      <Link to="/">
        <button className="primary-btn action-btn cancel-btn" id="action-btn">
          Cancel
        </button>
      </Link>
    </>
  );
}

export default EditButtons;
