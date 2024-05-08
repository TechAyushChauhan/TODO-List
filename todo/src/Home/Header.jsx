
import "./header.css";
function Header(props) {
  return (
    <div className="header">

        <p className="header-username">
          User:-{props.user}
        </p>
        
    </div>
  );
}

export default Header;