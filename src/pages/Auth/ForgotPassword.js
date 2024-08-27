import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { notification, Button } from 'antd';


const ForgotPassword = () => {
    
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");
    
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post("/api/v1/auth/forgot-password",{email,answer,newPassword});
        console.log(res);
        if (res && res.data.success){
          toast.success(res.data && res.data.message,);
         
          navigate("/login");
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
    <Layout title={'Forgot Password - Ecommerce APP'}>
        <div className='form-container' style={{ marginTop: '60px' }}> 
            <form onSubmit={handleSubmit}>
                <h4 className='title'> RESET PASSWORD </h4>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputPassword1" 
                placeholder='Enter Your Email' required value={email} onChange={(e) => (setEmail(e.target.value))}/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" 
                placeholder='Enter your New Password' required value={newPassword} onChange={(e) => (setNewPassword(e.target.value))}/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Answer</label>
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" 
                placeholder='Enter your favourite Sport Name' required value={answer} onChange={(e) => (setAnswer(e.target.value))}/>
            </div>

            <button type="submit" className="btn btn-primary">RESET</button>
            </form>

            </div>
    </Layout>
  )
}

export default ForgotPassword
