
export default function Error({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
    </div>
  );
}

Error.getInitialProps = ({ query }) => {
  return {
    error: query.error,
  };
};
