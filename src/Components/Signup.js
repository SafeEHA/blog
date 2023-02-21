import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);

    const userCredentials = { email, password };

    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    }).then(() => {
      alert("Publisher Account has been created!");
      history.push("/login");
    });
  };

  return (
    <div className="create">
      <form className="wrapper" onSubmit={handleSubmit}>
        <h3 className="title">Sign Up</h3>
        <div className="form-group">
          <label>Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
