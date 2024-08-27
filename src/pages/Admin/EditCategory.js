import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';

const EditCategory = () => {
  const { slug } = useParams();  // Get the category ID from the URL
  const [name, setName] = useState('');
  const [id,setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/category/single-category/${slug}`);
        if (data.success) {
          setName(data.category.name);
          setId(data.category._id);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Something went wrong', error);
        toast.error('Failed to load category');
      }
    };
    getCategory();
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${id}`, { name });
      if (data.success) {
        toast.success('Category updated successfully');
        navigate('/dashboard/admin/create-category');  // Redirect back to the category management page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Something went wrong', error);
      toast.error('Failed to update category');
    }
  };

  return (
    <Layout title={`Edit Category`}>
      <div className='container'>
        <h1>Edit Category</h1>
        <form onSubmit={handleUpdate}>
          <div className="sm-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">Update Category</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditCategory;
