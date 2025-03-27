import React from 'react'
import { useRef } from 'react';
const Header = () => {
    
  const loginModalRef = useRef(null); // Create a reference to the dialog element
  const signUpModalRef = useRef(null); // Create a reference to the dialog element
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
  return (
    <header>
          <h1 className="text-3xl text-center font-bold underline text-fuchsia-400">
            Budget Tracker
          </h1>
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
          <dialog ref={loginModalRef} className="modal-dialog">
        <div className="modal-content">
          <h2>Login</h2>
          <form className="flex flex-col" onSubmit={handleLoginCloseModal}>
            <label className = "underline" htmlFor="username">Username: </label>
            <input className = "border-2 border-gray-300 border-rounded-md" type="text" id="username" placeholder=" Enter Username" required />
            <br />
            <label className = "underline" htmlFor="password">Password: </label>
            <input className = "border-2 border-gray-300 border-rounded-md" type="password" id="password" placeholder="Enter Password" required />
            <br />
            <button className="btn-custom" type="submit">Submit</button>
          </form>
          <button className= "btn-custom-close" onClick={handleLoginCloseModal}>Close</button> {/* Close modal */}
        </div>
      </dialog>
      <dialog ref={signUpModalRef} className="modal-dialog">
        <div className="modal-content">
          <h2>Sign Up</h2>
          <form className="flex flex-col" >
            <label className = "underline" htmlFor="username">Username: </label>
            <input className = "border-2 border-gray-300 border-rounded-md" type="text" id="username" placeholder=" Enter Username" required />
            <br />
            <label className = "underline" htmlFor="password">Password: </label>
            <input className = "border-2 border-gray-300 border-rounded-md" type="password" id="password" placeholder=" Enter Password" required />
            <br />
            <button className="btn-custom" type="submit">Submit</button>
          </form>
          <button className= "btn-custom-close" onClick={handleSignupCloseModal}>Close</button> {/* Close modal */}
        </div>
      </dialog>
        </header>
        
  )
}

export default Header
