import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeData } from '../../Resux/ShowDataSlice';
import { Link } from 'react-router-dom';
import { isLoding, notLoding} from '../../Resux/RegisterSlice'


export default function All() {
  let{loginLoding}=useSelector((state)=>state.Register)
  const [namber, setnamber] = useState(20)
  const [data, setdata] = useState([]);
  let Dispatch = useDispatch();
  async function getData() {
    Dispatch(isLoding())
    let response = await Dispatch(HomeData());
    setdata(response.payload.data);
    Dispatch(notLoding())
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>
  {loginLoding!==false?  <div class="loding position-fixed z-3 top-0 bottom-0 start-0 end-0">
    <span class="loader position-absolute top-50 start-50"></span>
    </div>:
  <div className=' container mt-5 pt-5 text-center'>
    <div className="row">
      {
        data?.slice(0,namber).map((elmant)=><div key={elmant.id}className=" col-lg-3 col-md-4  col-sm-6 p-3 card-home cursor-pointer">
          <Link to={`/GameDetails/${elmant.id}`}>
          <img
                    src={elmant.thumbnail}
                    className="card-img-top"
                    alt="..."
                  ></img>
                  <div className='card-body p-3'>
                  <div className=" d-flex justify-content-between ">
                    <h4 className="text-truncate text-white-50">
                      {elmant.title}
                    </h4>
                    <h6 className="text-white free p-2">FREE</h6>
                  </div>
                  <p className=' text-truncate text-muted'>
                    {
                      elmant.short_description
                    }
                  </p>
                  <div className=' d-flex justify-content-between'>
                  <i className="fa-solid fa-square-plus text-white-50"></i>
                  <div>
                  <span class="category px-2 rounded-3 me-2">{elmant.genre}</span>
                  {elmant.platform==="PC (Windows)"?<i className="fa-brands fa-windows text-secondary"></i>:
                  <i className="fa-brands fa-chrome text-secondary"></i>}
                  </div>
                  </div>
                  </div>
          </Link>
        </div>)}
    </div>
    <button onClick={()=>setnamber(namber+20)} className="btn btn-outline-secondary">More Games</button>
  </div>
}
  </>
}
