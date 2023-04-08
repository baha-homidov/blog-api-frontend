function ErrorComponent(props) {
  console.log(props.error);

  return (
    <div className="error-component">
      <h1>{props.error.message} </h1>
      <h1>{props.error.status} </h1>
    </div>
  );
}

export default ErrorComponent;
