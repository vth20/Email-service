// import { GIF_404_NOTFOUND } from "../../theme/gif.ts";
// import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      {/* <img src={GIF_404_NOTFOUND} /> */}
      <p>Oops! The page you’re looking for could not be found</p>
      <a href="/home">Go to home page</a>
    </div>
  );
};

export default NotFoundPage;
