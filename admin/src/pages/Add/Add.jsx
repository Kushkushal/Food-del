// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'

import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({ url }) => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))

    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success) {

            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)

        }
        else {
            toast.error(response.data.message)

        }

    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here' />

                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" >
                            <option value="Atta, Maida & Besan">Atta, Maida & Besan</option>
                            <option value="Rice & Poha">Rice & Poha</option>
                            <option value="Dals & Grains">Dals & Grains</option>
                            <option value="Oil & Ghee">Oil & Ghee</option>
                            <option value="Masalas & Spices">Masalas & Spices</option>
                            <option value="Sugar & Salt">Sugar & Salt</option>
                            <option value="Milk & Egg">Milk & Egg</option>
                            <option value="Tea, Coffee & Nutrition Drinks">Tea, Coffee & Nutrition Drinks</option>
                            <option value="Bread, Cheese & Butter">Bread, Cheese & Butter</option>
                            <option value="Noodles & Pasta">Noodles & Pasta</option>
                            <option value="Pickles & Papads">Pickles & Papads</option>
                            <option value="Biscuits & Cakes">Biscuits & Cakes</option>
                            <option value="Chocolates & Candies">Chocolates & Candies</option>
                            <option value="Drinks & Juices">Drinks & Juices</option>
                            <option value="Chips & Namkens">Chips & Namkens</option>
                            <option value="Oral Care">Oral Care</option>
                            <option value="FaceWash & Skin Cream">FaceWash & Skin Cream</option>
                            <option value="Soaps & Handwash">Soaps & Handwash</option>
                            <option value="Hair Oil & Shampoo">Hair Oil & Shampoo</option>
                            <option value="Diapers & Pads">Diapers & Pads</option>
                            <option value="Cleaning Laundry">Cleaning Laundry</option>
                            <option value="Home Care">Home Care</option>
                            <option value="Pooja Supplies">Pooja Supplies</option>
                            <option value="Sauces & Honey">Sauces & Honey</option>
                            <option value="Cereals & Breakfast">Cereals & Breakfast</option>
                            <option value="Dry Fruits">Dry Fruits</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='20' />

                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>

            </form>

        </div>
    )
}

export default Add
