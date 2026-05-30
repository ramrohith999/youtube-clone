import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector(
    (state) => state.auth.token
  );

  return (
    <div>
      <h1>Home Page</h1>

      <p>Token: {token || "No Token"}</p>
    </div>
  );
};

export default Home;