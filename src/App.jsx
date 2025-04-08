
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Header from './client/component/Header';
import './App.css';
import Homepage from './client/HomePage';
import ReportsPage from './client/ReportsPage';
import TransactionPage from './client/TransactionPage';
import { UserContext } from './client/component/UserProvider'
const NotFound = () => <h2>404 - Not Found</h2>;
function App(){
  
  const {user} = useContext(UserContext);
  if (!user) {
    return (
      <>
        <Header />
        <Homepage />
      </>
    );
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>
    </>
  );
}

export default App;
