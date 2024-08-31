import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import './ListItems.css'

const ListItems = () => {

  const url = import.meta.env.VITE_API_URL;
  const [list, setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message)
    }
  }

  const removeFood = async (foodId) => {
    const res = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (res.data.success) {
      toast.success(res.data.message);
    }
    else {
      toast.error(res.data.message)
    }
    await fetchList();
  }

  useEffect(() => {
    fetchList();
  }, [])
  

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListItems