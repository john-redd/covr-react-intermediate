import { useEffect, useState } from 'react';
import './App.css';
import { Header, Main, Footer } from 'components';
import axios from 'axios';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = () => axios.get('/auth/user');

    getUser().then((res) => setUser(res.data));
  }, []);

  console.log({ user });

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
