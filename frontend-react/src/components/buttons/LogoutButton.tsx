import type { IAction } from '../../utils/actions';

function LogoutButton(props: IAction) {
  return (
    <button className="primary-btn logout-btn" id="logout-btn" onClick={props.action}>
      <img src="/images/logout.svg" alt="Logout" />
    </button>
  );
}

export default LogoutButton;
