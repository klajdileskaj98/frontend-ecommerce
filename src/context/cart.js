import { useState,useContext,createContext,useEffect } from "react";


const CardContext = createContext();

const CardProvider = ({children}) => {
    const [cart,setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart')
        if(existingCartItem) setCart(JSON.parse(existingCartItem));
    },[])

    return(
        <CardContext.Provider value={[cart,setCart]}>
            {children}
        </CardContext.Provider>
    )
}

const useCart = () => useContext(CardContext);

export { useCart, CardProvider }