import Logo from "../../assets/images/rofruit-logo.svg";
import "./Loading.scss";
const Loading = () => {
  return (
    <div className="loading">
      <img src={Logo} alt="logo" />
    </div>
  );
};

export default Loading;
