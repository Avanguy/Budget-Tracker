import React from 'react'
import { useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
/* import { useContext } from 'react';
import UserProvider from './UserProvider'; */
const Header = () => {
  const navigate = useNavigate();
  /* const {login } = useContext(UserProvider); */
  const loginModalRef = useRef(null); // Create a reference to the dialog element
  const signUpModalRef = useRef(null); // Create a reference to the dialog element
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  // State for signup form
  const [signUpData, setSignUpData] = useState({ username: "", password: "" });
  function handleLoginClick() {
    loginModalRef.current.showModal(); // Open the modal when "Log in" is clicked
  }

  function handleLoginCloseModal() {
    loginModalRef.current.close(); // Close the modal
  }
  function handleSignupClick() {
    signUpModalRef.current.showModal(); // Open the modal when "Log in" is clicked
  }

  function handleSignupCloseModal() {
    signUpModalRef.current.close(); // Close the modal
  }
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle input changes for signup
  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const {username,password} = loginData
    // Here you'd send loginData to backend for authentication
    const response = await fetch("http://localhost:5174/api/users/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({username,password})
        })
        const json = await response.json()
        if(!response.ok){
            console.log(json.error)
            return
        }
        if(response.ok){
            console.log("Login successful")
            /* navigate("/") */
        }
  };

  // Handle signup form submission
  const  handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const {username,password} = signUpData
    const signUpResponse = await fetch("http://localhost:5174/api/users/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({username,password})
    
    })
    const user = await signUpResponse.json()
    if(!signUpResponse.ok){
        console.log(user.error)
        return
    }
    if(signUpResponse.ok){
        navigate("/transactions")
        handleSignupCloseModal()
    }
  };
  return (
    <header className='flex justify-between items-center p-4 bg-gray-400'>
          <h1 className="text-3xl font-bold text-white mx-auto hover:cursor-pointer hover:animate-pulse" onClick={() => navigate("/")}>
            Budget Tracker
          </h1>
          <div className=''>
            <button
                className="btn-custom"
                onClick={handleLoginClick} // Open modal on click
            >
                Log in
            </button>
            <button
                className="btn-custom"
                onClick={handleSignupClick} // Open modal on click
            >
                Sign up
            </button>
          </div>
          <dialog ref={loginModalRef} className="modal-dialog border-green-950 border-2  bg-gradient-to-b from-green-200 to-green-400 rounded-md shadow-lg">
            <div className="modal-content">
                <h2 className='text-3xl font-bold text-green-950 mx-auto'>Login</h2>
                <form className="flex flex-col" onSubmit={handleLoginSubmit}>
                <label className="underline" htmlFor="login-username">Username:</label>
                <input
                    className="border-2 border-black border-rounded-md"
                    type="text"
                    id="login-username"
                    name="username"
                    placeholder=" Enter Username"
                    value={loginData.username} // Make sure loginData state exists
                    onChange={handleLoginChange}
                    required
                />
                <br />
                <label className="underline" htmlFor="login-password">Password:</label>
                <input
                    className="border-2 border-black border-rounded-md"
                    type="password"
                    id="login-password"
                    name="password"
                    placeholder=" Enter Password"
                    value={loginData.password} // Ensure loginData state exists
                    onChange={handleLoginChange}
                    required
                />
                <br />
                <button className="btn-custom border-black border-rounded-md border-2" type="submit">Submit</button>
                </form>
                <button className="btn-custom-close border-black border-rounded-md border-2" onClick={handleLoginCloseModal}>Close</button>
            </div>
            </dialog>

      <dialog ref={signUpModalRef} className="modal-dialog border-green-950 border-2  bg-gradient-to-b from-green-200 to-green-400 rounded-md shadow-lg">
        <div className="modal-content">
          <h2 className='text-3xl font-bold text-green-950 mx-auto'>Sign Up</h2>
          <form className="flex flex-col" onSubmit={handleSignUpSubmit}>
            <label className="underline" htmlFor="signup-username">Username:</label>
            <input
              className="border-2 border-black border-rounded-md"
              type="text"
              id="signup-username"
              name="username"
              placeholder=" Enter Username"
              value={signUpData.username}
              onChange={handleSignUpChange}
              required
            />
            <br />
            <label className="underline" htmlFor="signup-password">Password:</label>
            <input
              className="border-2 border-black border-rounded-md"
              type="password"
              id="signup-password"
              name="password"
              placeholder=" Enter Password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />
            <br />
            <button className="btn-custom border-black border-rounded-md border-2" type="submit">Submit</button>
          </form>
          <button className="btn-custom-close border-black border-rounded-md border-2" onClick={handleSignupCloseModal}>
            Close
          </button>
        </div>
      </dialog>
    </header>
        
  )
}

export default Header
