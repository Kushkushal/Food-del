import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});


    const url = "https://food-del-backend-jt7r.onrender.com"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])




    
    const addToCart = async (itemId) => {
        // Ensure cartItems is initialized
        if (!cartItems) {
            console.error("cartItems is undefined or null");
            return;
        }
    
        // Check if the item exists in the cart and update accordingly
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    
        // Send the request to the server if the token exists
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };
    
    const removeFromCart = async (itemId) => {
    // Update cart items locally
    setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 1) {
            // Decrease the quantity if more than 1
            updatedCart[itemId] -= 1;
        } else {
            // Remove the item from cart if quantity reaches 0 or less
            delete updatedCart[itemId];
        }
        return updatedCart;
    });

    // Update cart on the server if a token exists
    if (token) {
        try {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        } catch (error) {
            console.error("Error removing from cart:", error);
            // Rollback cart update if the server operation fails
            setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        }
    }
};


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
                console.error(`Item with ID ${itemId} not found in food_list`);
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
