import React from 'react'
import { useRef,useState } from 'react';
const Header = () => {

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
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Here you'd send loginData to backend for authentication
  };

  // Handle signup form submission
  const  handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signUpData);
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
        console.log("testst")
        /* const createUserCollectionCheck = createUserCollections(user)
        if(!createUserCollectionCheck?.isSuccessful){
            console.log(createUserCollectionCheck?.erroMessage)
            return
        }
        setIsLoading(false)
        localStorage.setItem('user',JSON.stringify(user))
        login(user.userId,user.token)
        navigate("/") */
        }
    // Here you'd send signUpData to backend for registration
  };
  const getUsers = async () => {
    const signUpResponse = await fetch("http://localhost:5174/api/users/")
    const user = await signUpResponse.json()
    if(!signUpResponse.ok){
        console.log(user.error)
        return
    }
    if(signUpResponse.ok){
        console.log(user)
        /* const createUserCollectionCheck = createUserCollections(user)
        if(!createUserCollectionCheck?.isSuccessful){
            console.log(createUserCollectionCheck?.erroMessage)
            return
        }
        setIsLoading(false)
        localStorage.setItem('user',JSON.stringify(user))
        login(user.userId,user.token)
        navigate("/") */
        }
    // Here you'd send signUpData to backend for registration
}
  return (
    <header>
          <h1 className="text-3xl text-center font-bold underline text-fuchsia-400">
            Budget Tracker
          </h1>
          <button
            className="btn-custom"
            onClick={getUsers} // Open modal on click
          >
            Log in
          </button>
          <button
            className="btn-custom"
            onClick={handleSignupClick} // Open modal on click
          >
            Sign up
          </button>
          <dialog ref={loginModalRef} className="modal-dialog">
            <div className="modal-content">
            <h2>Login</h2>
            <form className="flex flex-col" onSubmit={handleLoginSubmit}>
                <label className = "underline" htmlFor="username">Username: </label>
                <input className = "border-2 border-gray-300 border-rounded-md" type="text" id="username" placeholder=" Enter Username" required
                 onChange={handleLoginChange}
                 />
                <br />
                <label className = "underline" htmlFor="password">Password: </label>
                <input className = "border-2 border-gray-300 border-rounded-md" type="password" id="password" placeholder="Enter Password" required 
                 onChange={handleLoginChange}
                />
                <br />
                <button className="btn-custom" type="submit">Submit</button>
            </form>
            <button className= "btn-custom-close" onClick={handleLoginCloseModal}>Close</button> {/* Close modal */}
            </div>
        </dialog>
      <dialog ref={signUpModalRef} className="modal-dialog">
        <div className="modal-content">
          <h2>Sign Up</h2>
          <form className="flex flex-col" onSubmit={handleSignUpSubmit}>
            <label className="underline" htmlFor="signup-username">Username:</label>
            <input
              className="border-2 border-gray-300 rounded-md"
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
              className="border-2 border-gray-300 rounded-md"
              type="password"
              id="signup-password"
              name="password"
              placeholder=" Enter Password"
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />
            <br />
            <button className="btn-custom" type="submit">Submit</button>
          </form>
          <button className="btn-custom-close" onClick={handleSignupCloseModal}>
            Close
          </button>
        </div>
      </dialog>
    </header>
        
  )
}

export default Header
