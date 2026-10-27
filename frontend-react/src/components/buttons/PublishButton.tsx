import type { IAction } from '../../utils/actions';

function PublishButton(props: IAction) {
  return (
    <button className="primary-btn action-btn" id="action-btn" onClick={props.action}>
      Publish
    </button>
  );
}

export default PublishButton;
