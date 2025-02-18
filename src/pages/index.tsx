const InitialPage = () => {
  return null;
};

export const getServerSideProps = () => {
  const isAuthenticated = localStorage.getItem('user.isAuthenticated');

  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }
};

export default InitialPage;
