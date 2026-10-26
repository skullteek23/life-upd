import type { IAction } from '../../utils/actions';

interface IDateAction extends IAction {
  label: string;
}

function DateButton(props: IDateAction) {
  return (
    <button className="selectable-btn" type="button" onClick={props.action}>
      {props.label}
    </button>
  );
}

export default DateButton;
