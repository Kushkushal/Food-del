import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

// Function to format price with INR symbol
const formatPrice = (price) => {
    if (price === undefined || price === null) {
        return 'No price';
    }
    return `₹${price.toFixed(2)}`; // Ensuring 2 decimal places
};

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    if (!food_list || food_list.length === 0) {
        return <div className='food-display'>Items loading, please wait</div>;
    }

    return (
        <div className='food-display' id='food-display'>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if (category === "All" || category === item.category) {
                        console.log('Rendering item:', item); // Debugging log
                        return (
                            <FoodItem
                                key={item?._id}
                                id={item?._id}
                                name={item?.name ?? 'No name'}
                                description={item?.description ?? 'No description'}
                                price={formatPrice(item?.price)}
                                image={item?.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
