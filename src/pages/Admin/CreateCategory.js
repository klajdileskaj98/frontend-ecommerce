import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";
import { useNavigate,useLocation } from 'react-router-dom'



const CreateCategory = () => {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const { data } = await axios.post('/api/v1/category/create-category', {name} )

      if(data?.success){
        toast.success(`${data.category.name} is created`)
        getAllCategory();
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
      console.log(error)
      toast.error('something went wrong in input form')
    }
  }

  const handleDelete = async (id) => {
    try{
      const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`)
      if (data.success){
        toast.success(`Category deleted successfully`)
        getAllCategory();
      }
    }
    catch(error){
      console.log(error);
      toast.error('something went wrong in delete action')
    }
  }

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      // Call your delete function here
      handleDelete(id);
    }
  };

  

  const getAllCategory = async () => {
    try{
      const { data } = await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data?.category);
      }
    }
    catch(error){
      console.log(error)
      toast.error("Something went wrong in getting categories")
    }
  }

  useEffect(() => {
    getAllCategory();
  },[])

  return (
    <Layout title={"Dashboard - Create Category"}>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'></div>
    </div>
    <h1> Manage Category </h1>
      <div className='p-3 w-50'>
        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
      </div>
    <div>
        <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
         {categories?.map( c => (
          <>
            <tr>
              <td key={c._id}>{c.name}</td>
              <td>
                <button className='btn btn-primary ms-2' onClick={() =>navigate(`/dashboard/admin/edit-category/${c.slug}`)}>Edit</button>
                <button className='btn btn-danger ms-2' onClick={() => handleDeleteClick(c._id)} >Delete</button>
              </td>
            </tr>
          </>
         ))}

      </tbody>
    </table>
  </div>

 

</Layout>
  )
}

export default CreateCategory
