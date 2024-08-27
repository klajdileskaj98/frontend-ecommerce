import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

import "../../styles/AuthStyles.css";

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer,setAnswer] = useState("")


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name,email,password,address,phone)
        try{
          const res = await axios.post("/api/v1/auth/register",{name,email,password,phone,address,answer});
          if(res && res.data.success){
            toast.success(res.data.message,{
              duration: 5000
            });
            navigate("/login")
           
          }else{
            toast.error(res.data.message)
          }
        }catch(error){
          console.log(error);
          toast.error("Something went wrong");
        }
    }

  return (
    <Layout title="Register - Ecommerce App">
        <div className='register'>

          <div className='form-container' style={{marginTop: '70px'}}> 
            <form onSubmit={handleSubmit}>
            <h4 className='title'> REGISTER </h4>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={name}
                onChange={(e) => setName(e.target.value)} 
                placeholder='Enter your Name' required />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Enter your Email' required/>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Enter your Password' required/>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                <input type="phone" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={phone}
                onChange={(e) => setPhone(e.target.value)} 
                placeholder='Enter your Phone' required/>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={address}
                onChange={(e) => setAddress(e.target.value)} 
                placeholder='Enter your Address' required/>
              </div>


              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Answer</label>
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={answer}
                onChange={(e) => setAnswer(e.target.value)} 
                placeholder='What is your Favorite sports' required/>
              </div>

              <button type="submit" className="btn btn-primary">Register</button>
            </form>

            </div>
     </div>
    </Layout>
  )
}

export default Register
