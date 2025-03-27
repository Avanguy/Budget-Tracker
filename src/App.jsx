
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/component/Home';
import TransactionPage from './client/component/TransactionPage';
import Header from './client/component/Header';
const About = () => <h2>About Page</h2>;
const NotFound = () => <h2>404 - Not Found</h2>;
import './App.css';

function App() {
  return (
    <>
    <Header />
      <nav>
        <div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/transactions">Transactions</a></li>
            </ul>
          </nav>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>      
    </>
  );
}

export default App;
