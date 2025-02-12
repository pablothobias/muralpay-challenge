type Props = { value: boolean };

const InitialPage = ({ value }: Props) => {
  return <div>{value && <h1>Initial Page</h1>}</div>;
};

export const getServerSideProps = async () => {
  return {
    props: { value: true },
  };
};

export default InitialPage;
