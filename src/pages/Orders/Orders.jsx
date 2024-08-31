import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import './Orders.css'

const Orders = () => {

  const url = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error while fetching all orders")
    }
  };

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
      toast.success("Status updated")
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>All Orders</h3>
      <div className="order-list">
        {orders.map((order,index) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name+" x "+item.quantity
                  } else {
                    return item.name+" x "+item.quantity+", "
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName+" "+order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{ order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pinCode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone} </p>
            </div>
            <p>Total Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Order Being Prepared">Order Being Prepared</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders