import React from "react";
import { Auth } from "aws-amplify";

const Welcome = (props) => {
  function handleClick(event) {
    Auth.confirmSignUp("cookie99", "247805")
      .then((data) => {
        console.log(data, "data");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section className="section-auth">
      <div>
        <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>
          We've sent you an email. Please check the verification code and enter
          below
        </p>
        <label>Enter Verify Code:</label>
        <button onClick={handleClick}>Verify</button>
      </div>
    </section>
  );
};

export default Welcome;
