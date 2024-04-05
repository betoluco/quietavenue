import React, { Fragment, useEffect } from "react";
import { useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Search from "../common/Search";
import { fetchEstates } from "../estatesReducer";
import CardsTemplate from "../common/CardsTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import neighborhoodLG from "./neighborhoodLG.jpg";
import neighborhoodMD from "./neighborhoodMD.jpg";
import audioAndVideoMD from "./audioAndVideoMD.png";
import audioAndVideoSM from "./audioAndVideoSM.png";
import noisyNeighborMD from "./noisyNeighborMD.jpg";
import noisyNeighborSM from "./noisyNeighborSM.jpg";

const Home = (props) =>{
  const dispatch = useDispatch();
  const estateStatus = useSelector( state => state.estates.status );
  
  useEffect( () => {
    if ( estateStatus === "idle" ) dispatch( fetchEstates() );
  }, [estateStatus, dispatch]);
  
  const estates = useSelector( state => state.estates.estates);
  
  let content;

  if (estateStatus === 'loading') {
    content = <Spinner/>;
  } else if (estateStatus === 'succeeded') {
    content = <CardsTemplate estates={estates}/>;
  } else if (estateStatus === 'failed') {
    content = <InternalServerError />;
  }
    
  return (
    <Fragment>
      <div className="">
        <div className="flex flex-col  py-10 mb-12 absolute w-full">
          <div className="flex justify-center ">
            <h2 className="text-center font-bold tracking-wide text-stone-50 mb-12 md:mb-16 px-3
              text-2xl sm:text-4xl xl:text-5xl md:max-w-xl xl:max-w-3xl">
              See and hear what goes on <br /> in front of your future home
            </h2>
          </div>
          <Search/>
        </div>
        <img 
        className="border-y border-stone-400 min-h-[300px] object-cover -mt-12"
        alt="main header"
        srcSet={`
        ${neighborhoodMD} 1000w,
        ${neighborhoodLG} 4300w
        `}
        sizes="100vw"
        src={neighborhoodLG} />
        <Link to="/workFlow" className="">
          <div className="flex justify-center my-8">
            <h2 className="drop-shadow-lg bg-green-600 rounded-md p-3 mb-3 text-2xl text-white text-center">
              Real estate professional? <br /> <span className="underline" >click here</span>
            </h2>
          </div>
        </Link>
        <div className="px-3 flex justify-center py-16 mb-12 bg-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg">
            <div className="flex flex-col bg-white rounded-md px-2 py-2">
              <h3 className="text-lg sm:text-xl mb-2 text-stone-800 font-medium"> 
                Buying a house is stressfull!
              </h3>
              <img 
              className="mb-2 aspect-auto border border-strone-200 w-full "
              alt="noisy neighboor"
              srcSet={`
              ${noisyNeighborMD} 1000w,
              ${noisyNeighborSM} 500w
              `}
              size="(min-width: 768px) 50vw,(min-width: px1024) 512px, 100vw"
              src={noisyNeighborSM} />
              <p className=" text-base text-stone-800">
                When you buy a house, you make a long-term commitment to the area where you buy, but...
                What if the neighbors are loud?  Are there parties every weekend? Barking dogs at 4am?...
              </p>
            </div>
            <div className="flex flex-col bg-white rounded-md px-2 py-2">
              <h3 className="text-lg sm:text-xl mb-2 text-stone-800 font-medium"> 
                QuietAvenue can help you!
              </h3>
              <img 
              className="mb-2 aspect-auto border border-strone-200 w-full "
              alt="audio and video"
              srcSet={`
              ${audioAndVideoMD} 1000w,
              ${audioAndVideoSM} 500w
              `}
              size="(min-width: 768px) 50vw,(min-width: px1024) 512px, 100vw"
              src={audioAndVideoSM} />
              <p className="mb-2 text-justify text-base text-stone-800">
                In QuietAvenue.com we use audio and video recorded on site that is analyzed with proprietary AI so 
                you can see and hear out what it is like to live in that area.
              </p>
              <Link to="/mission" className="text-center underline text-blue-600 hover:text-blue-800 mb-3">
                learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
      {content}
    </Fragment>
  );
};

const loadData = (store, req) => {
  return store.dispatch( fetchEstates());
};

const HomeExport = {
  loadData,
  element: <Home />,
};

export default HomeExport;