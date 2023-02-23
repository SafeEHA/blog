import BlogList from "./BlogList";
import useFetch from "../useFetch";

const Home = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://json-server.devops-playground.com/blogs");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
