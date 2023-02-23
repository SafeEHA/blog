import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import UploadWidget from "./Components/UploadWidget";

const BlogDetails = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const currentUser = localStorage.getItem("currentUser");
  const [author] = useState(currentUser);
  const showAdminButton = localStorage.getItem("currentUser") ? "" : "hider";
  const hideImagePlaceholder = (image) => image ? "" : "hider";

  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://json-server.devops-playground.com/blogs/" + id);
  const history = useHistory();

  const handleDelete = () => {
    fetch("http://json-server.devops-playground.com/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  const handleEdit = () => {
    fetch("http://json-server.devops-playground.com/blogs/" + blog.id, {
      method: "PUT",
      body: blog
    }).then(() => {
      window.location.reload()
    });
  };

  let blogDetailClass = "blog-details"
  let editClass = "hider"

  const edit = () => {
    console.log("Editing...")
    editClass = "create"
    blogDetailClass = "hider"    
  }

  return (
    <div>
    <div className={blogDetailClass}>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <img src={blog.image} alt="" width="200px" height="200px" className={hideImagePlaceholder(blog.image)} /> <br/>
          <button style={{background: '#fff' , color: "grey"}} onClick={edit} className={showAdminButton}>
            Edit
          </button>
          <button onClick={handleDelete} className={showAdminButton}>
            Delete
          </button>
        </article>
      )}
    </div>
      <div className={editClass}>
      <h2>Add a New Blog</h2>
      <form>
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
        />
        <UploadWidget />
        <button onClick={handleEdit}>Save Edit</button>
      </form>
    </div>
    </div>
  );
};

export default BlogDetails;
