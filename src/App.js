import { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Loader from "./components/Loader"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Category from "./pages/Category"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import Product from "./pages/Product"

export default function App() {
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		fetch("https://fakestoreapi.com/products/categories")
			.then((res) => res.json())
			.then((json) => {
				setCategories(json)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
			})

		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((json) => setProducts(json))
			.catch((err) => {
				console.error(err)
			})
	}, [])

	const addToCart = (id, title, price, category, description, image) => {
		let itemIndex = cart.filter((el) => el.id === id)
		if (itemIndex.length) {
			itemIndex[0].quantity++
		} else {
			let quantity = 1
			let newItem = {
				id,
				title,
				price,
				category,
				description,
				image,
				quantity,
			}
			setCart([...cart, newItem])
		}
	}

	let totalPrice = cart.reduce((sum, el) => {
		return sum + el.price * el.quantity
	}, 0)

	return (
		<BrowserRouter>
			<div className="my-content">
				<Link to="/cart" className="toggleModal">
					<i className="material-icons">shopping_cart</i>
				</Link>
				<Header categories={categories} />
				<div className="container" style={{ padding: "1rem 0" }}>
					{loading ? (
						<Loader />
					) : (
						<Routes>
							<Route
								path="/"
								element={<Home products={products} addToCart={addToCart} />}
							/>
							<Route path="/about" element={<About />} />
							<Route
								path="/cart"
								element={<Cart cart={cart} totalPrice={totalPrice} />}
							/>
							<Route
								path="/category/:id"
								element={<Category addToCart={addToCart} />}
							/>
							<Route
								path="/product/:id"
								element={<Product addToCart={addToCart} />}
							/>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					)}
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
