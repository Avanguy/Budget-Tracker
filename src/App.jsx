
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './client/component/Header';
import './App.css';
import Homepage from './client/HomePage';
import TransactionPage from './client/TransactionPage';

const NotFound = () => <h2>404 - Not Found</h2>;
function App(){
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>      
    </>
  );
}

export default App;
