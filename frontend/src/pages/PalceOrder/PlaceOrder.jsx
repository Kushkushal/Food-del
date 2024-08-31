import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onCheckboxChange = (event) => {
    setIsCashOnDelivery(event.target.checked);
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    if (isCashOnDelivery) {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo)
        }
      })

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 10,
      }
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        toast.success('Order Placed');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect to home after 2 seconds
      } else {
        toast.error('Error placing order');
      }
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [getTotalCartAmount, navigate, token])

  return (
    <>
      <ToastContainer />
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <div className="multi-field">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>
          <div className="multi-field">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 10}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
              </div>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={isCashOnDelivery}
                onChange={onCheckboxChange}
              />
              <label>Cash on Delivery</label>
            </div>
            <button type='submit' disabled={!isCashOnDelivery}>Place Order</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder
