import { useNavigate, useParams, useLocation } from "react-router-dom";

function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    return <Component {...props} router={{ navigate, params, location }} />;
  };
}

export default withRouter;
