import { type FC } from 'react';
import { page } from '../../styles/home/index.styles';

type Props = {
  value: boolean;
};

const Home: FC<Props> = ({ value }) => {
  console.log(value);
  return (
    <div css={page}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: { value: true },
  };
}
