import { useState } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError({
        email: "All fields are required",
        password: "All fields are required",
      });
      return;
    }
    if (!validator.isEmail(email)) {
      setError({
        email: "invalid email",
        password: "",
      });
      return;
    }
    if (!validator.isStrongPassword(password)) {
      setError({
        email: "",
        password: "password not strong enough",
      });
      return;
    }
    setError("");

    const userCredentials = { email, password };

    fetch("http://json-server.devops-playground.com/users/", {
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
            placeholder="johndoe@abc.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {error.email ? <span className="error">{error.email}</span> : ""}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error.password ? (
            <span className="error">{error.password}</span>
          ) : (
            ""
          )}
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
