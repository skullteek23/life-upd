import type { IAction } from '../../utils/actions';

function ResetButton(props: IAction) {
  return (
    <button className="selectable-btn cross-btn" id="action-btn" onClick={props.action}>
      <img src="images/home.svg" alt="Reset Date Filter" />
    </button>
  );
}

export default ResetButton;
