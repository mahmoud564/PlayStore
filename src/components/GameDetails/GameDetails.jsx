import React from 'react'
import { useParams } from 'react-router-dom'
import { GameDetailss } from '../../Resux/ShowDataSlice'
import { useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function GameDetails() {
   
    var settings = {
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  const [data, setdata] = useState([])
  let params=useParams()
  let Dispatch=useDispatch()
  async function showdata(params){
    let respons=await Dispatch(GameDetailss(params))
    setdata(respons.payload.data)
  }
useEffect(() => {
  showdata(params)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return <>
  {data?<div className=' container my-5 pt-5 Details text-white-50'>
<div className="row">
    <div className="col-md-4 my-2">
      <img className='w-100' src={data.thumbnail} alt="" />
      <div className=' mt-3'>
      <div className="d-flex justify-content-between p-2">
      <span className="free text-white-50 py-2 px-3 rounded-2">FREE</span>
      <a class="w-75 " target="_blank" href={data.game_url} rel="noreferrer">
        <button className="btn text-white fw-bolder w-100 btnl"> PLAY NOW <span> </span>
      <i className="fa-solid fa-right-to-bracket"></i></button></a></div>
      </div>
    
    </div>
    <div className="col-md-8">
      <h1>{data.title}</h1>
      <h5>About {data.title} </h5>
      <p>{data.description}</p>
      {data.minimum_system_requirements?<><h5>minimum system requirements</h5>
      <ul className="p-0 text-white-50">
        <li><span className="fw-bold">Graphics :</span>{data.minimum_system_requirements.graphics}</li>
        <li><span className="fw-bold">Memory :</span>{data.minimum_system_requirements.memory}</li>
        <li><span className="fw-bold">Os :</span>{data.minimum_system_requirements.os}</li>
        <li><span className="fw-bold">processor :</span>{data.minimum_system_requirements.processor}</li>
        <li><span className="fw-bold">Storage :</span>{data.minimum_system_requirements.storage}</li></ul></>:""}
        <h3>{data.title} Photo :</h3>
        <Slider {...settings}>
       { data.screenshots?.map((e,i)=><div><img height={400} className='100%' src={data.screenshots[i].image} alt="" /></div>)}

      
    </Slider>
        
  <h3 className='mt-2'>Additional Information :</h3>
  <div className="row">
   
    <div className="col-6 col-md-6 col-lg-4 ps-0"><span className="text-secondary">Title</span><p>{data.title}</p></div>
    <div className="col-6 col-md-6 col-lg-4 ps-0"><span className="text-secondary">Developer</span><p>{data.developer}</p></div>
    <div className="col-6 col-md-6 col-lg-4 ps-0"><span className="text-secondary">Publisher</span><p>{data.publisher}</p></div>
    <div className="col-6 col-md-6 col-lg-4 ps-0"><span className="text-secondary">Release Date</span><p>{data.release_date}</p></div>
    <div className="col-6 col-md-6 col-lg-4 ps-0"><span className="text-secondary">Genre</span><p>{data.genre}</p></div>
    <div className="col-6 col-md-6 col-lg-4 ps-0"><span className="text-secondary">Platform</span><p><span>{data.platform==="Web Browser"?
    <i className="fa-brands fa-chrome text-secondary"></i>:<i className="fa-brands fa-windows text-secondary"></i>}
    <span> </span>
    </span>{data.platform}</p></div>
   
  </div>
      </div>
  </div>

  </div>:""}
  </>
    
 
}
