import type { IAction } from '../../utils/actions';

function ContinueButton(props: IAction) {
  return (
    <button className="primary-btn action-btn" id="action-btn" onClick={props.action}>
      Continue
    </button>
  );
}

export default ContinueButton;
