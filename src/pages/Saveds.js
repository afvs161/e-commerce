import { useEffect } from "react"

export default function Saveds() {
	useEffect(() => {
		const savedProducts = JSON.parse(localStorage.getItem("item"))
		console.log(savedProducts)
	}, [])

	return <div>Saveds</div>
}
