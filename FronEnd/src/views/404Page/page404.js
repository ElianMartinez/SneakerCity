import "./index.css";
import { Link, Button } from "@material-ui/core";
const Page404 = () => {
  return (
    <div id="main">
      <div className="fof">
        <h1>Error 404</h1>
      </div>
      <Link href="/">
        <Button variant="contained">Volver</Button>
      </Link>
    </div>
  );
};

export default Page404;
