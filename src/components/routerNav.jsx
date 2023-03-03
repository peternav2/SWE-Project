import { Link } from "react-router-dom";

export default function RouterNav() {
    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/docs">Internal Documentation</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/view-menus">View University Menus</Link> |{" "}
            {/* For other future components */}
            <Link to="/TODO">TODO</Link> |{" "}
            <Link to="/TODO">TODO</Link> |{" "}
            <Link to="/TODO">TODO</Link>
        </nav>
    );
}