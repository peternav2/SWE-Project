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
            <Link to="/create-account">Create Account</Link> |{" "}
            <Link to="/admin-hub">Admin Hub</Link> |{" "}
            <Link to="/student-hub">Student Hub</Link> |{" "}
            <Link to="/view-menus">View University Menus</Link> |{" "}
            <Link to="/university-menu-reviews">University Menu Reviews</Link> |{" "}
            <Link to="/event-board">Event Board</Link> |{" "}
            <Link to="/off-campus-dining">Off Campus Dinning</Link> |{" "}
            <Link to="/dish-review-form">Dish Review Form</Link> |{" "}

            {/* For other future components */}
            <Link to="/TODO">TODO</Link>
        </nav>
    );
}