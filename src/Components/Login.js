import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    fetch(`http://localhost:8000/users?email=${email}&password=${password}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
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
