import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});


    const url = "https://food-del-backend-jt7r.onrender.com"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])




    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }

    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})

        }
    }

    const getTotalCartAmount = () => {
    let totalAmount = 0;
    console.log("Cart Items:", cartItems);
    console.log("Food List:", food_list);

    for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
            const itemInfo = food_list.find((product) => product._id === itemId);

            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            } else {
                console.error(``);
            }
        }
    }

    return totalAmount;
};


    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }
    const loadCartData = async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }


    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }

        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken


    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
