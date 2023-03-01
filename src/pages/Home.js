import CardItem from "../components/CardItem"

export default function Home({ products, addToCart }) {
	return (
		<div className="cardWrapper">
			{products.length ? (
				products.map((product) => {
					return <CardItem addToCart={addToCart} {...product} />
				})
			) : (
				<h2>No products found</h2>
			)}
		</div>
	)
}
