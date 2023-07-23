import BlogList from "./BlogList";
import useFetch from "../useFetch";

const Home = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("https://my-json-server.typicode.com/SafeEHA/blog/blogs");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
