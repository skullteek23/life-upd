import '../styles/error.scss';

type ErrorProp = { err: Error };

function Error(props: ErrorProp) {
  return <div className="error-container">{props.err.message}</div>;
}

export default Error;
