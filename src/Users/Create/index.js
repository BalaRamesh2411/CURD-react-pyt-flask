import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export const Create = () => {
    const [newUsers,setNewUsers] = useState("")

   let formData=new FormData();
   formData.append("name",newUsers)

    // post method
    const handleadd=async()=>{
        await axios.post("https://balaramesh2411.pythonanywhere.com/addTodo",formData).then((res)=>{
            console.log(res,"res")
        })
    }


  return (
    <div>
        <form>
            <lable> employee_name</lable>
            <input type = "text" 
            onChange={(e) => setNewUsers(e.target.value) } 
            placeholder='enter the name' />
             <button  type = "button" onClick={handleadd}>ADD TODO</button>
        </form>
        <Link  to={"/users/list"}> previous</Link>
    </div>
  )
}
