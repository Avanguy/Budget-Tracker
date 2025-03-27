
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/component/Home';
import Header from './client/component/Header';
const NotFound = () => <h2>404 - Not Found</h2>;
import './App.css';
import Transaction from './client/component/Transaction';

function App() {
  return (
    <>
    <Header />
      {/* <nav>
        <div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/transactions">Transactions</a></li>
            </ul>
          </nav>
        </div>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>      
    </>
  );
}

export default App;
