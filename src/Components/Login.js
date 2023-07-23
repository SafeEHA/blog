import { useState } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
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
        password: null,
      });
      return;
    }
    if (!validator.isStrongPassword(password)) {
      setError({
        email: null,
        password: "password not strong enough",
      });
      return;
    }
    setError(null);

    console.log(email, password);

    fetch(
      `https://my-json-server.typicode.com/SafeEHA/blog/users?email=${email}&password=${password}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.length >= 1) {
          // User account exists if response length is 1 - then set authentication on localStorage
          localStorage.setItem("currentUser", email);
          history.push("/create");
          window.location.reload();
        } else {
          // If response is 0 - then ask user to input correct credentials or create an account
          alert("Invalid credentials!");
        }
      });
  };

  return (
    <div className="create">
      <form className="wrapper" onSubmit={handleSubmit}>
        <h3 className="title">Log In</h3>
        <div className="form-group">
          <label className="title2">Email address</label>
          <input
            type="email"
            className="text-field1"
            placeholder="johndoe@abc.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {error.email ? <span className="error">{error.email}</span> : null}
        </div>
        <div className="form-group">
          <label className="title2">Password</label>
          <input
            type="password"
            className="text-field2"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error.password ? (
            <span className="error">{error.password}</span>
          ) : null}
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
