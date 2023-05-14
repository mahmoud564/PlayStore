import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import {RegisterUeser, isLoding, notLoding} from '../../Resux/RegisterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import photo from '../Media/register-login-banner.d5751ff804c935b205d3.jpg'



export default function Register() {
  let{loginLoding}=useSelector((state)=>state.Register)
  const [error, seterror] = useState("")
  let dispatch=useDispatch()
  let navget =useNavigate()
  let validationSchema =yup.object({
    name:yup.string().required("Name is required").min(3, "Name MinLength 3").max(15,"Name MaxLength 15"),
    email:yup.string().required("Email is required").email("Email is Not valed"),
    password:yup.string().required("password is required").matches(/^[A-Z][\w]{5,15}$/,"password stert letter Captal and password Length 6 to 15 "),
    rePassword:yup.string().required("repassword is required").oneOf([yup.ref("password")],"rePassword is valed"),
    phone:yup.string().required("phone is Required").matches(/^01[0125][0-9]{8}$/,"phone is valed")
    
  })

  async function SendDataRegister(value){
    dispatch(isLoding())
    let respons= await dispatch( RegisterUeser(value))
    if(respons?.payload?.data?.message==="success"){
      navget("/login")
      dispatch(notLoding())
    }else{
      dispatch(notLoding())
      seterror(`${respons.payload?.data?.errors?.param}:${respons.payload?.data?.errors?.msg}` )}
    
  }
  let formik=useFormik({
    initialValues:{
      name:"",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },validationSchema,onSubmit:(SendDataRegister)
  })
  return <>
  <div className=' container py-5 my-5'>
    <div className="row">
    <div className='col-md-6 '><img src={photo} className=' rounded-2 img-fluid' /></div>
    <div className='col-md-6 regester rounded-2 '>
    <div className='my-3'>
    <h2  className=' mb-3'>Create My Account!</h2>
    {error?<div className="alert alert-danger fs-6">{error}</div>:null}
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-md-6">
      <input className=' form-control  my-2' placeholder='Name' type="text" name='name' id='name' value={formik.values.name} onBlur={formik.handleBlur}  onChange={formik.handleChange} />
       {formik.errors.name&&formik.touched.name?<div className=' alert alert-danger py-2'>{formik.errors.name}</div>:""}
       </div>
       <div className="col-md-6">
      <input className=' form-control  my-2' placeholder='Email' type="email" name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.errors.email&&formik.touched.email?<div className=' alert alert-danger py-2'>{formik.errors.email}</div>:""}
      </div>
      </div>
      <input className=' form-control my-4' type="password" placeholder='Password' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.errors.password&&formik.touched.password?<div className=' alert alert-danger py-2'>{formik.errors.password}</div>:""}
      <input className=' form-control my-4' type="password" placeholder=' RePassword' name='rePassword' id='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.errors.rePassword&&formik.touched.rePassword?<div className=' alert alert-danger py-2'>{formik.errors.rePassword}</div>:""}
      <input className=' form-control my-4' type="phone" placeholder='Phone' name='phone' id='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.errors.phone&&formik.touched.phone?<div className=' alert alert-danger py-2'>{formik.errors.phone}</div>:""}
      
      {loginLoding!==false?<button className="btn bg-main " type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       Loading...
      </button>:
      <button disabled={!(formik.isValid &&formik.dirty)} type="submit" className="btn text-white p-2 w-100 border border-dark">Create Account</button> }


    </form>
    </div>
    </div>
    </div>
    </div>
  </>
}
