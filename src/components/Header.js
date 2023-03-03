import { Link, NavLink } from "react-router-dom"

export default function Header({ categories }) {
	return (
		<div className="my-header">
			<div className="n-shadow">
				<div className="navMenu">
					<nobr>
						<Link to="/">Home</Link>
						<Link to="/likeds">Likeds</Link>
						<Link to="/about">About</Link>
						<div className="dot"></div>
					</nobr>
				</div>
				<div className="container row my-subMenu">
					{categories.length ? (
						categories.map((category) => {
							return (
								<NavLink
									to={`/category/${category}`}
									className="categoryName col"
								>
									{category}
								</NavLink>
							)
						})
					) : (
						<h6 style={{ color: "white" }}>No category found</h6>
					)}
				</div>
			</div>
		</div>
	)
}
