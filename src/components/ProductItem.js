import { Link } from "react-router-dom"

export default function ProductItem({
	id,
	title,
	price,
	category,
	description,
	image,
	quantity,
	incQ,
	decQ,
	del,
}) {
	return (
		<div className="shopping-card__main myCardDetails">
			<div className="shopping-card__product">
				<div className="shopping-card__image">
					<img src={image} alt={image} />
				</div>
				<div className="shopping-card__details">
					<div className="shopping-card__title">
						<Link to={`/product/${id}`}>{title}</Link>
					</div>
					<div className="shopping-card__options">
						<div>
							<small className="option__key">Piece: </small>
							<small className="option__value">{quantity}</small>
						</div>
					</div>
					<div className="shopping-card__price">
						£{(price * quantity).toFixed(2)}
					</div>
					<div className="buttonWrapper">
						<button
							className="btn-small grey darken-3"
							onClick={() => decQ(id)}
						>
							<i className="material-icons" style={{ fontSize: "1rem" }}>
								remove
							</i>
						</button>
						<button className="btn-small grey darken-3" onClick={() => del(id)}>
							<i className="material-icons" style={{ fontSize: "1rem" }}>
								delete
							</i>
						</button>
						<button
							className="btn-small grey darken-3"
							onClick={() => incQ(id)}
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
}
