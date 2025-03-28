
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Home from './client/component/Home';
import Header from './client/component/Header';
import Dashboard from './client/component/Dashboard';
import { UserContext } from './client/component/UserProvider';
const NotFound = () => <h2>404 - Not Found</h2>;
import './App.css';
import Transaction from './client/component/Transaction';

function App(){
  const {user} = useContext(UserContext);
  return (
    <>
    <Header />
      
      <Routes>
        <Route path="/" element={user?.token === "" ?  <Home /> : <Dashboard/>} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>      
    </>
  );
}

export default App;
