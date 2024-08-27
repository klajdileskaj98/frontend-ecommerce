import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { useAuth } from '../../context/auth';

import "../../styles/AuthStyles.css";

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const [auth,setAuth] = useAuth();


    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post("/api/v1/auth/login",{email,password});
        if (res && res.data.success){
          toast.success(res.data && res.data.message,{
            duration: 5000
          });
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data));
          navigate( location.state || "/");
        }
        else{
          toast.error(res.data.message);
        } 
      }
      catch(error){
        console.log(error);
        toast.error("Something went wrong");
      }
    }

  return (
        <Layout title="Login - Ecommerce App">
        <div className='login'>

        <div className='form-container' style={{marginTop: '60px'}}> 
            <form onSubmit={handleSubmit}>
            <h4 className='title'> Login </h4>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputName" aria-describedby="emailHelp" 
                placeholder='Enter your Email' required value={email} onChange={(e) => (setEmail(e.target.value))}/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" 
                placeholder='Enter your Password' required value={password} onChange={(e) => (setPassword(e.target.value))}/>
            </div>
            <div className='mb-3'>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')} } >Forgot Password</button>

            </form>

            </div>
    </div>
    </Layout>
  )
}

export default Login
