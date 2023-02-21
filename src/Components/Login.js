import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    fetch(`http://localhost:8000/users?email=${email}&password=${password}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="title2">Password</label>
          <input
            type="password"
            className="text-field2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
