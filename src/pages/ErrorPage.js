import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<div>
			<h3>
				Page Not Found! <br />
				Code error <b>404</b>
			</h3>
			<Link to="/" className="btn grey darken-3">
				Go to Home Page
			</Link>
		</div>
	)
}
