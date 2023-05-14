// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function ProviderReact(props) {
  let Navigate=useNavigate()
  let {key}=useSelector((state)=>state.Register)
  if(key!==null){
  return  props.children
  }else{
    return Navigate("/login")

  }
  // eslint-disable-next-line no-unreachable
  return
}
