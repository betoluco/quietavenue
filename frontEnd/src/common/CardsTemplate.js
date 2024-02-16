import React, { Fragment } from "react";

import Card from "./Card";

const CardsTemplate = (props) =>{
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate} key={estate.url}/>;
  });
  
  return (
    <Fragment>
      <h2 className="text-2xl sm:text-4xl text-center px-3 mb-10 text-stone-800">
          Current properties <span className="text-green-600"> on sale</span> 
      </h2>
      <div className="mb-8 mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsList}
      </div>
    </Fragment>
  );
};

export default CardsTemplate;