import { Link } from "react-router-dom"

export default function Cart({ cart, totalPrice, incQ, decQ, del }) {
	return (
		<>
			{cart.length ? (
				<>
					<div className="my-card__header">
						<div className="total">£{totalPrice.toFixed(2)}</div>
					</div>
					{cart.map((item) => {
						return (
							<div className="shopping-card__main myCardDetails">
								<div className="shopping-card__product">
									<div className="shopping-card__image">
										<img src={item.image} alt={item.image} />
									</div>
									<div className="shopping-card__details">
										<div className="shopping-card__title">
											<Link to={`/product/${item.id}`}>{item.title}</Link>
										</div>
										<div className="shopping-card__options">
											<div>
												<small className="option__key">Piece: </small>
												<small className="option__value">{item.quantity}</small>
											</div>
										</div>
										<div className="shopping-card__price">
											£{(item.price * item.quantity).toFixed(2)}
										</div>
										<div className="buttonWrapper">
											<button
												className="btn-small grey darken-3"
												onClick={() => decQ(item.id)}
											>
												<i className="material-icons" style={{ fontSize: "1rem" }}>
													remove
												</i>
											</button>
											<button
												className="btn-small grey darken-3"
												onClick={() => del(item.id)}
											>
												<i className="material-icons" style={{ fontSize: "1rem" }}>
													delete
												</i>
											</button>
											<button
												className="btn-small grey darken-3"
												onClick={() => incQ(item.id)}
											>
												<i className="material-icons" style={{ fontSize: "1rem" }}>
													add
												</i>
											</button>
										</div>
									</div>
								</div>
							</div>
						)
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
