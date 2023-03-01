export default function Footer() {
	return (
		<footer className="page-footer f-shadow" style={{ padding: "0" }}>
			<div className="footer-copyright">
				<div className="container">
					© {new Date().getFullYear()} Copyright Text
					<a href="#" className="grey-text text-lighten-4 right">
						idk
					</a>
				</div>
			</div>
		</footer>
	)
}
