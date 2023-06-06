import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useHistory } from "react-router-dom";

const AdminLogin = () => {
  const history = useHistory();
  const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    async function submit(e){
      e.preventDefault();

      try{

          await axios.post("mongodb+srv://inani:Inani%402021@inani-development.cplfj.mongodb.net/inani-development/adminlogin",{
              email,password
          })
          .then(res=>{
              if(res.data=="exist"){
                  history("/adminsidebar",{state:{id:email}})
              }
              else if(res.data=="notexist"){
                  alert("User have not sign up")
              }
          })
          .catch(e=>{
              alert("wrong details")
              console.log(e);
          })

      }
      catch(e){
          console.log(e);

      }

  }



   return (
<>
<div  style={{"backgroundColor": "#c0c0c0"}}>
           <div className="container d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
          <div className="d-flex flex-column justify-content-between">
             <div className="row justify-content-center">
               <div className="col-lg-6 col-md-10">
                 <div className="card card-default mb-0">
                   <div className="card-header pb-0">
                     <div className="app-brand w-100 d-flex justify-content-center border-bottom-0">
                       <a className="w-auto pl-0" href="/index.html">
                         <img src="images/logo.png" alt="Mono"/>
                        {/* <img alt=" logo madhuri" src={logoimg} /> */}
                         <span className="brand-name text-dark">InaniHub</span>
                       </a>
                     </div>
                   </div>
                   <div className="card-body px-5 pb-5 pt-0">

                     <h4 className="text-dark mb-6 text-center">Sign in </h4>

                     <form action="/index.html">
                       <div className="row">
                         <div className="form-group col-md-12 mb-4">
                           <input type="email" className="form-control input-lg" id="email" aria-describedby="emailHelp"
                             placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                         </div>
                         <div className="form-group col-md-12 ">
                           <input type="password" className="form-control input-lg" id="password" 
                           onChange={(e) => { setPassword(e.target.value) }}
                           placeholder="Password" />
                         </div>
                         <div className="col-md-12">

                           <div className=" mb-3">

                         

                             <a className="text-color float-end" href="#"> Forgot password? </a>

                           </div>

                           <button type="submit" onClick={submit} className="btn btn-primary btn-pill mb-4 mt-4 px-3">Sign In</button>

                         
                         </div>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

 </div> 
</>




   
  );
};

export default AdminLogin;



 