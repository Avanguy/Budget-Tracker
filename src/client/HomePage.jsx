

import { useContext } from 'react';
import { UserContext } from './component/UserProvider';
import Dashboard from './component/Dashboard';
import Home from './component/Home';

function Homepage(){
  const {user} = useContext(UserContext);
  return (
    <>
        {user === null ?  <Home/> : <Dashboard/>}
    </>
  );
}

export default Homepage;
