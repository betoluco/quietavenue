import Root from "./components/stateless/Root";
import Estate from "./components/Estate";
import MainHeader from "./components/stateless/MainHeader";
import Estates from "./components/Estates";
import FilteredEstates from "./components/FilteredEstates";
import FetchFail from "./components/stateless/FetchFail";
import NotFound from "./components/stateless/NotFound";

const Routes = [
    {
        component: Root,
        routes:[
            {
                ...Estate,
                path: "/estate/:estateId"
            },
            {
                component: MainHeader,
                path:"/",
                routes:[
                    {
                        ...Estates,
                        path: "/",
                        exact: true
                    },
                    {
                        ...FilteredEstates,
                        path: "/filter/:filter/:groupId"
                    },
                    {
                        component: FetchFail,
                        path: "/fetchFail"
                    },
                    
                    {
                        component: NotFound
                    }
                ]
            }
        ]
    }
];

export default Routes;