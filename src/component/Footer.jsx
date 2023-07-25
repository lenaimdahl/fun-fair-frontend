import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <p>creators: <Link to={"https://github.com/lenaimdahl"}>Lena</Link> & <Link to={"https://github.com/olga321go"}>Olga</Link></p>
      {/* <p>contact us</p> */}
    </footer>
  );
}

export default Footer;
