import { Link } from "react-router-dom"
import ProductItem from "../components/ProductItem"

export default function Cart({ cart, totalPrice, incQ, decQ, del }) {
	return (
		<>
			{cart.length ? (
				<>
					<div className="my-card__header">
						<div className="total">£{totalPrice.toFixed(2)}</div>
					</div>
					{cart.map((item) => {
						return <ProductItem {...item} decQ={decQ} incQ={incQ} del={del} />
					})}
				</>
			) : (
				<>
					<h2>Cart is empty</h2>
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
