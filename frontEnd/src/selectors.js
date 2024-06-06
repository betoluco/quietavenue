import CardsTemplate from "./common/CardsTemplate";
import InternalServerError from "./common/InternalServerError";
import Spinner from "./common/Spinner";

export const selectStatus = state => state.estates.status;

export const selectContent = (state, filter, filterType) => {
    const allEstates = state.estates.estates;
    let estates = allEstates;
    if(filter){
       estates = allEstates.filter(estate => parseInt(filter) === estate[filterType]);
    }
    if (state.estates.status === 'loading') {
        return <Spinner/>;
    } else if (state.estates.status === 'succeeded') {
        return <CardsTemplate estates={estates}/>;
    } else if (state.estates.status === 'failed') {
        return <InternalServerError />;
    }
};