import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardItem from "../components/CardItem"
import Loader from "../components/Loader"

export default function Category({ addToCart }) {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		fetch(`https://fakestoreapi.com/products/category/${id}`)
			.then((res) => res.json())
			.then((json) => {
				setProducts(json)
				setLoading(false)
			})
			.catch((err) => console.error(err))
	}, [id])

	return (
		<div className="cardWrapper">
			{loading ? (
				<Loader />
			) : products.length ? (
				products.map((product) => {
					return <CardItem addToCart={addToCart} {...product} />
				})
			) : (
				<h2>No products found</h2>
			)}
		</div>
	)
}
