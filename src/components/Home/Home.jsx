import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HomeData } from "../../Resux/ShowDataSlice";
import { useState } from "react";
import { isLoding, notLoding} from '../../Resux/RegisterSlice'
export default function Home() {
  let{loginLoding}=useSelector((state)=>state.Register)
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
   {loginLoding !==false?  <div class="loding position-fixed z-3 top-0 bottom-0 start-0 end-0">
    <span class="loader position-absolute top-50 start-50"></span>
    </div>:<>
    <div className="text-center home m-0 border-1 border-dark mt-5 ">
        <div className=" position-relative top-50 translate-middle-y ">
          <h1 className="text-white-50">
            Find &amp; track the best <span className="span">free-to-play</span>{" "}
            games!
          </h1>
          <p className="text-muted">
            Track what you've played and search for what to play next! Plus get
            free premium loot!
          </p>
          <Link to={"/All"}>
            <button className="btn btn-outline-secondary">Browse Games</button>
          </Link>
        </div>
      </div>
      <section>
        <div className=" container my-5">
          <div className="row">
            <h3 className="text-white-50 mb-4">
              <i className="fa-solid fa-robot"></i> <span> </span>
              Personalized Recommendations
            </h3>
          </div>
          <div className="row">
            {data?.slice(0, 3).map((elmant) => (
              <div
                key={elmant.id}
                className=" col-md-4 p-3 card-home cursor-pointer"
              >
                <Link to={`/GameDetails/${elmant.id}`}>
                  <img
                    src={elmant.thumbnail}
                    className="card-img-top"
                    alt="..."
                  ></img>
                  <div className="card-body d-flex justify-content-between px-3 py-3">
                    <h4 className="text-truncate text-white-50">
                      {elmant.title}
                    </h4>
                    <h6 className="text-white free p-2">FREE</h6>
                  </div>
                </Link>{" "}</div>))}</div></div></section></>}</>}
