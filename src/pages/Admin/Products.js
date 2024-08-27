import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link,useLocation } from 'react-router-dom'

const Products = () => {
    const [products,setProducts] = useState([]);

    const location = useLocation();


    const getAllProduct = async () => {
        try{
            const { data } = await axios.get('/api/v1/product/get-products');
            setProducts(data.products)
        }
        catch(error){
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllProduct();

        if (location.state?.updated) {
            getAllProduct();
        }

    },[location.state]);

  return (
    <Layout>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products list</h1>
                <div className='d-flex flex-wrap'>
                    {products?.map(p => (
                        <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`} className='product-link'>
                            <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                 </div>

            </div>
        </div>
    </Layout>  
    )
}

export default Products
