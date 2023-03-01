import { Link } from "react-router-dom";

export default function CardItem({
	id,
	title,
	price,
	category,
	description,
	image,
	addToCart,
}) {
	return (
		<ul className="carousel x-slide">
			<li className="item">
				<div className="content-image">
					<img src={image} alt={image} height={200} />
				</div>
				<div className="content-info">
					<Link to={`/product/${id}`} className="content-title">{title}</Link>
					<div className="content-price">
						<span>£{price}</span>
					</div>
					<a
						className="addButton"
						onClick={() =>
							addToCart(id, title, price, category, description, image)
						}
					>
						<i className="material-icons">add_shopping_cart</i>
					</a>
				</div>
			</li>
		</ul>
	)
}
