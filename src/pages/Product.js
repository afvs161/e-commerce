import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../components/Loader"

export default function Product({ addToCart }) {
	const [product, setProduct] = useState({})
	const [loading, setLoading] = useState(false)
	const [bookmark, setBookmark] = useState(false)
	const { id } = useParams()
	const goBack = useNavigate()

	const oldBookmarks = JSON.parse(localStorage.getItem("item"))
	useEffect(() => {
		if (oldBookmarks) {
			const bookmarkId = oldBookmarks.filter((el) => el.id == id)[0]
			if (bookmarkId) {
				setBookmark(true)
			}
		}

		setLoading(true)
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then((res) => res.json())
			.then((json) => {
				setProduct(json)
				setLoading(false)
			})
			.catch((err) => console.error(err))
	}, [id])

	const { title, price, category, description, image, rating } = product

	const addToBookmark = () => {
		if (bookmark) {
			// remove function
			const bookmarks = oldBookmarks.filter((el) => el.id != id)
			localStorage.setItem("item", JSON.stringify([...bookmarks]))
			setBookmark(false)
		} else {
			// add function
			const newBookmark = {
				id,
				title,
				price,
				category,
				description,
				image,
				rating: { rate: rating.rate, count: rating.count },
			}

			if (oldBookmarks) {
				// checking if there's item
				const bookmarkId = oldBookmarks.filter((el) => el.id == id)[0]
				if (!bookmarkId) {
					// checking if id already exists
					localStorage.setItem(
						"item",
						JSON.stringify([...oldBookmarks, newBookmark])
					)
				}
			} else {
				localStorage.setItem("item", JSON.stringify([newBookmark]))
			}
			setBookmark(true)
		}
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="product-container row">
					<div className="images col m6 s12">
						<img className="image" src={image} alt={image} />
					</div>
					<div className="info col m6 s12">
						<h1>{title}</h1>
						<h2 className="price">£{price}</h2>
						<div className="rateBook">
							{rating && (
								<div className="rating">
									<div
										className="rating-upper"
										style={{
											width: ((rating.rate / 5) * 100).toFixed() + "%",
										}}
									>
										<span>★</span>
										<span>★</span>
										<span>★</span>
										<span>★</span>
										<span>★</span>
									</div>
									<div className="rating-lower">
										<span>★</span>
										<span>★</span>
										<span>★</span>
										<span>★</span>
										<span>★</span>
									</div>
								</div>
							)}
							<Link
								onClick={addToBookmark}
								style={{ color: bookmark ? "#fddb3a" : "#272727" }}
							>
								<i className="material-icons">
									{bookmark ? "bookmark" : "bookmark_border"}
								</i>
							</Link>
						</div>
						<button
							className="cart grey darken-3"
							onClick={() =>
								addToCart(id, title, price, category, description, image)
							}
						>
							Add to cart
						</button>
						<p className="description">{description}</p>
						<Link
							onClick={() => goBack(-1)}
							className="btn grey darken-3"
							style={{ marginTop: "20px" }}
						>
							Go back
						</Link>
					</div>
				</div>
			)}
		</>
	)
}
