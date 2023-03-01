import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loader from "../components/Loader"

export default function Product({ addToCart }) {
	const [product, setProduct] = useState({})
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then((res) => res.json())
			.then((json) => {
				setProduct(json)
				setLoading(false)
			})
			.catch((err) => console.error(err))
	}, [id])

	const { title, price, category, description, image } = product

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
						<p className="sku">Артикул: aru1303</p>
						<h2 className="price">£{price}</h2>
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
							to="/"
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
