import { Link } from "react-router-dom"

export default function Cart({ cart, totalPrice }) {
	return (
		<>
			{cart.length ? (
				<>
					{cart.map((item) => {
						return (
							<div class="shopping-card__main">
								<Link to={`/product/${item.id}`} class="shopping-card__product">
									<div class="shopping-card__image">
										<img src={item.image} alt={item.image} />
									</div>
									<div class="shopping-card__details">
										<div class="shopping-card__title">{item.title}</div>
										<div class="shopping-card__options">
											<div>
												<small class="option__key">Piece: </small>
												<small class="option__value">{item.quantity}</small>
											</div>
										</div>
										<div class="shopping-card__price">
											£{item.price * item.quantity}
										</div>
									</div>
								</Link>
							</div>
						)
					})}
					<div class="shopping-card__footer">
						<div class="total">£{totalPrice.toFixed(2)}</div>
					</div>
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
