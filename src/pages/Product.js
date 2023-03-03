import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../components/Loader"

export default function Product({ addToCart }) {
	const [product, setProduct] = useState({ comments: [] })
	const [loading, setLoading] = useState(false)
	const [bookmark, setBookmark] = useState(false)
	const [error, setError] = useState(false)
	const [comment, setComment] = useState("")
	const [name, setName] = useState("")
	const [star, setStar] = useState(0)
	const goBack = useNavigate()
	const { id } = useParams()

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
				setProduct({ ...json, comments: [] })

				setLoading(false)
			})
			.catch((err) => console.error(err))
	}, [id])

	const { title, price, category, description, image, rating, comments } =
		product

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
				comments,
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

	const sendComment = (e) => {
		e.preventDefault()
		if (comment.length && name.length >= 3 && star) {
			function getObj() {
				if (product.id == id) {
					return {
						...product,
						comments: [
							...product.comments,
							{ id: Date.now(), name, comment, rate: star },
						],
					}
				} else {
					return product
				}
			}
			setProduct(getObj)
			toast("Review was sent. Thank you for your time.", {
				toastId: "success1",
			})
			setComment("")
			setName("")
			setStar(0)
			setError(false)
		} else {
			setError(true)
		}
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="product-container row">
						<div className="images col m6 s12">
							<img className="image" src={image} alt={image} />
						</div>
						<div className="info col m6 s12">
							<h1>{title}</h1>
							<h2 className="price">£{price}</h2>
							<div className="rateBook">
								{rating && (
									<div style={{ height: "25px", lineHeight: "25px" }}>
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
										<p>{rating.rate} out of 5</p>
									</div>
								)}
								<Link
									onClick={addToBookmark}
									style={{ color: bookmark ? "#fddb3a" : "#272727" }}
								>
									<i className="material-icons">
										{bookmark ? "favorite" : "favorite_border"}
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
					<form style={{ margin: "20px 0" }} onSubmit={sendComment}>
						<div className="input-container">
							<div
								className="error"
								style={{ display: error ? "block" : "none" }}
							>
								Your review must be legible! Try again!
							</div>
							<div className="names">
								<textarea
									type="text"
									className="reviewinp"
									placeholder="Write a review"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								></textarea>
							</div>
							<div className="input">
								<div className="inputbox">
									<input
										type="text"
										className="firstname"
										placeholder="Full Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="stars">
									<div className={`star1 ${star >= 1 ? "upToStar" : null}`}>
										<span onClick={() => setStar(1)}>★</span>
									</div>
									<div className={`star2 ${star >= 2 ? "upToStar" : null}`}>
										<span onClick={() => setStar(2)}>★</span>
									</div>
									<div className={`star3 ${star >= 3 ? "upToStar" : null}`}>
										<span onClick={() => setStar(3)}>★</span>
									</div>
									<div className={`star4 ${star >= 4 ? "upToStar" : null}`}>
										<span onClick={() => setStar(4)}>★</span>
									</div>
									<div className={`star5 ${star >= 5 ? "upToStar" : null}`}>
										<span onClick={() => setStar(5)}>★</span>
									</div>
								</div>
								<div className="submitbtn">
									<button className="btn grey darken-3">Submit Review</button>
								</div>
							</div>
							<ul
								style={{
									marginTop: "20px",
									textAlign: "center",
									width: "100%",
								}}
							>
								{comments.length ? (
									comments.map((comment) => {
										return (
											<li>
												<div className="testimonial">
													<p className="quote">{comment.comment}</p>
													<div className="rating" style={{ margin: "0 auto" }}>
														<div
															className="rating-upper"
															style={{
																width:
																	((comment.rate / 5) * 100).toFixed() + "%",
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
													<p className="attribution">- {comment.name}</p>
												</div>
											</li>
										)
									})
								) : (
									<h2>Be first to comment</h2>
								)}
							</ul>
						</div>
					</form>
				</>
			)}
		</>
	)
}
