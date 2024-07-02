import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const List = () => {
    const [Post,setPost]=useState([])
    const Navigate =useNavigate();
  
    // get method
    const getall=async()=>{
      let getData= await axios.get(`https://balaramesh2411.pythonanywhere.com/getTodo`)
      setPost(getData.data)
  }

  useEffect(() =>{
    getall()
  },[])

// // it use frondend delete only
//   const deleteuser= (Id)=>{
//       const handleDelete = Post.filter((data) => data.id != Id);
//       setPost(handleDelete);
//  }
 const deleteuser= async(id)=>{
   await axios.delete(`https://balaramesh2411.pythonanywhere.com/deleteTodo/${id}`).then((res)=>{
    console.log(res,"res")
    alert(res.data.message)
    getall()
   })
 };


  return (
    <div>
         <table>
        <thead>
          <tr>
          <th>emp_id</th>
          <th>emp_name</th>
          </tr>
        </thead>
        <tbody>
             {Post.map((Post,i)=>{
                return (
                    <>
                    <tr key={i}>
                        <td>{Post.id}</td>
                        <td>{Post.name}</td>
                        <td><button type='button' onClick={()=>Navigate(`/users/edit/${Post.id}`)}>edit</button> </td>
                        {/* <td><button> <Link to={"/users/view"}>view</Link>  </button> </td>  */}
                        <td><button type="button" onClick={()=>deleteuser(Post.id)}>delete</button></td>                 
                    </tr>
                     </>
                     )
                })}  
            </tbody>
            <Link  to={"/users/create"}> ADD user</Link>
      </table>
    </div>
  )
}

export default List