import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { json, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Edit = () => {

    const [editItem,setEditItem] = useState([])

    const {id} = useParams();

    const handleEditData = async ()=>{
        const  editData= await axios.get(`https://balaramesh2411.pythonanywhere.com/editTodo/${id}`)
        setEditItem(editData.data)
        console.log(editData.data)
    }

    useEffect(()=>{
      handleEditData()
    },[]);

  const handleUpdate = async  () =>{
    let formData = new FormData()
    formData.append("item",editItem)
     await axios.put(`https://balaramesh2411.pythonanywhere.com/updateTodo/${id}`,formData).then((res)=>{
      console.log(res.data)
     })
 

  }

   

  return (
    <div>
      <form>
        <h2>EditData</h2>
        {JSON.stringify(editItem)}
            <label> employee_name</label>
            <input type = "text" 
            defaultValue={editItem.emp_name}
            onChange={(e) => setEditItem(e.target.value)} 
            placeholder='enter the name' />
            <button type='button' onClick={handleUpdate}>update</button>
        </form>
        <Link  to={"/users/list"}> list of data</Link>
    </div>
  )
}

export default Edit
