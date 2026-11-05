import type { IAction } from '../../utils/actions';

function ResetImageButton(props: IAction) {
  return (
    <button className="primary-btn remove-image-btn" type="button" onClick={props.action}>
      <img src="/images/cross.svg" alt="Remove Photo" />
    </button>
  );
}

export default ResetImageButton;
