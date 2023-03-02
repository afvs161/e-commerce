import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BookmarkItem from "../components/BookmarkItem"

export default function Saveds({ addToCart }) {
	const [bookmarks, setBookmarks] = useState([])

	useEffect(() => {
		setBookmarks(JSON.parse(localStorage.getItem("item")))
	}, [bookmarks])

	const removeFromBookmark = (id) => {
		const oldBookmarks = JSON.parse(localStorage.getItem("item"))
		const bookmarks = oldBookmarks.filter((el) => el.id != id)
		localStorage.setItem("item", JSON.stringify([...bookmarks]))
	}

	return (
		<>
			{bookmarks.length ? (
				<>
					{bookmarks.map((item) => {
						return (
							<BookmarkItem
								{...item}
								addToCart={addToCart}
								removeFromBookmark={removeFromBookmark}
							/>
						)
					})}
				</>
			) : (
				<>
					<h2>No saved products yet</h2>
					<Link
						to="/"
						className="btn grey darken-3"
						style={{ marginTop: "20px" }}
					>
						Go to homepage
					</Link>
				</>
			)}
		</>
	)
}
