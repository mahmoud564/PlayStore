import React, { useEffect, useState } from 'react'
import { SortFunction } from '../../Resux/ShowDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { isLoding, notLoding} from '../../Resux/RegisterSlice'


export default function SortBy() {
  let{loginLoding}=useSelector((state)=>state.Register)
    const [data, setdata] = useState([])
  let Dispatch=useDispatch()
  let Params=useParams()
  async function ShowData(params){
    Dispatch(isLoding())
let respons=await Dispatch(SortFunction(params))
setdata(respons.payload.data);
Dispatch(notLoding())
  }
  const [namber, setnamber] = useState(20)
 useEffect(() => {
  ShowData(Params)
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [Params])
 
  return <> {loginLoding!==false?  <div class="loding position-fixed z-3 top-0 bottom-0 start-0 end-0">
  <span class="loader position-absolute top-50 start-50"></span>
  </div>:<div className=' container mt-5 pt-5 text-center'>
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
