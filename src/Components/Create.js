import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const currentUser = localStorage.getItem("currentUser");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author] = useState(currentUser);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      // history.go(-1);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <input
          type="text"
          disabled
          required
          value={author}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add Blog</button>
      </form>
    </div>
  );
};

export default Create;
