import Spinner from 'react-bootstrap/Spinner';

function Spin() {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ width: "100%", height: "50vh" }}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="dark" />
      </div>
    </>
  );
}

export default Spin;
