import { Outlet } from 'react-router-dom';
import Directory from '../components/directory/directory';

import '../App.css';
// TODO: INIT THE PROJECT AGAIN IN FIREBASE (firebase init) AND DEPLOY TO AND DEPLOY TO A PRIVIEW CHANNEL.
// Remember to change node version!!!
const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  )
};

export default Home;
