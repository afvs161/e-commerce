import { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
		let itemIndex = cart.filter((el) => el.id == id)[0]
		if (itemIndex) {
			itemIndex.quantity++
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
		toast("Good was successfully added to basket!", {
			toastId: "success1",
			theme: "dark",
		})
	}

	let totalPrice = cart.reduce((sum, el) => {
		return sum + el.price * el.quantity
	}, 0)

	const incQ = (id) => {
		let itemIndex = cart.filter((el) => el.id === id)[0]
		itemIndex.quantity++
		setCart([...cart], itemIndex)
	}

	const decQ = (id) => {
		let itemIndex = cart.filter((el) => el.id === id)[0]
		if (itemIndex.quantity > 1) {
			itemIndex.quantity--
		}
		setCart([...cart], itemIndex)
	}

	const del = (id) => {
		let itemIndex = cart.filter((el) => el.id !== id)
		setCart([...itemIndex])
		toast.error("Good was successfully removed to basket!", {
			toastId: "success1",
			theme: "dark",
		})
	}

	return (
		<BrowserRouter>
			<ToastContainer position="top-right" autoClose={3000} />
			<div className="my-content">
				<Link to="/cart" className="toggleModal">
					<i className="material-icons">shopping_cart</i>
				</Link>
				<Header categories={categories} />
				<div className="container">
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
								element={
									<Cart
										cart={cart}
										totalPrice={totalPrice}
										incQ={incQ}
										decQ={decQ}
										del={del}
									/>
								}
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
