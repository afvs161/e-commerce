import { Link } from "react-router-dom"

export default function BookmarkItem({
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
	addToCart,
	removeFromBookmark,
}) {
	return (
		<div className="shopping-card__main myCardDetails">
			<div className="shopping-card__product" style={{ position: "relative" }}>
				<div className="shopping-card__image">
					<img src={image} alt={image} />
				</div>
				<div className="shopping-card__details">
					<div className="shopping-card__title">
						<Link to={`/product/${id}`}>{title}</Link>
					</div>
					<div className="shopping-card__price">
						£{price.toFixed(2)}
						<a
							className="myCardDetailsA"
							onClick={() =>
								addToCart(id, title, price, category, description, image)
							}
						>
							<i className="material-icons">add_shopping_cart</i>
						</a>
					</div>
					<Link
						onClick={() => removeFromBookmark(id)}
						className="myCardDetailsButton"
					>
						<i className="material-icons">bookmark</i>
					</Link>
				</div>
			</div>
		</div>
	)
}
