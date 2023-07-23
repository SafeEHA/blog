import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import UploadWidget from "./Components/UploadWidget";

const BlogDetails = () => {
  const [editing, setEditing] = useState(null);
  const currentUser = localStorage.getItem("currentUser");
  const [author] = useState(currentUser);
  const showAdminButton = localStorage.getItem("currentUser") ? "" : "hider";
  const hideImagePlaceholder = (image) => (image ? "" : "hider");

  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
    setData,
  } = useFetch("https://my-json-server.typicode.com/SafeEHA/blog/blogs/" + id);
  const history = useHistory();

  const handleDelete = () => {
    fetch("https://my-json-server.typicode.com/SafeEHA/blog/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const image = localStorage.getItem("currentImage");
    const author = localStorage.getItem("currentUser");
    blogObj.author = author
    if (image) {
      blogObj.image = image;
    }
    console.log("Submitting...");
    fetch("https://my-json-server.typicode.com/SafeEHA/blog/blogs/" + blog.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogObj),
    })
      .then((res) => res.json())
      .then((response) => {
        setEditing(false);
        setData(response);
      });
  };

  const [blogObj, setBlogObj] = useState({ title: "", body: "", image: null });

  const enableEdit = () => {
    setEditing(true);
    setBlogObj({
      title: blog.title,
      body: blog.body,
      image: blog.image ? blog.image : null,
    });
  };

  if (isPending) return <div>Loading...</div>;
  return (
    <div>
      <div className={editing ? "hider" : "blog-details"}>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {blog && (
          <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div>{blog.body}</div>
            <img
              src={blog.image}
              alt=""
              width="200px"
              height="200px"
              className={hideImagePlaceholder(blog.image)}
            />{" "}
            <br />
            <button
              style={{ background: "#fff", color: "grey" }}
              onClick={enableEdit}
              className={showAdminButton}
            >
              Edit
            </button>
            <button onClick={handleDelete} className={showAdminButton}>
              Delete
            </button>
          </article>
        )}
      </div>
      <div className={editing ? "create" : "hider"}>
        <h2>Edit Blog</h2>
        <form onSubmit={handleEdit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={blogObj.title}
            onChange={(e) => setBlogObj({ ...blogObj, title: e.target.value })}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={blogObj.body}
            onChange={(e) => setBlogObj({ ...blogObj, body: e.target.value })}
          ></textarea>
          <label>Blog author:</label>
          <input
          type="text"
          disabled
          required
          value={author}
          />
          <UploadWidget />
          <button type="submit">Save Edit</button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
