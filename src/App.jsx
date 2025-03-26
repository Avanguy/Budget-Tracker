import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/component/Home';
import TransactionPage from './client/component/TransactionPage';
const About = () => <h2>About Page</h2>;
const NotFound = () => <h2>404 - Not Found</h2>;
import './App.css'

function App() {
  function handleClick() {
    console.log('Button clicked')
  }
  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-bold underline text-fuchsia-400">
          Hello world!
        </h1>
        
        <button  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:cursor-pointer' onClick={handleClick}>Log in</button>
        <button  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:cursor-pointer' onClick={handleClick}>Sign up</button>
      </div>
      <Router>
        <div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/transactions">Transactions</a></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<TransactionPage />} />
            <Route path="*" element={<NotFound />} /> {/* Fallback route */}
          </Routes>
        </div>
      </Router>
    </>
  )
}
//mongodb+srv://nguyenvalbert:<db_password>@cluster0.5dj9mw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
export default App
