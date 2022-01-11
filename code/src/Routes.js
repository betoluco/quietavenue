import Root from "./components/stateless/Root";
import Estate from "./components/Estate";
import Estates from "./components/Estates";
import FilteredEstates from "./components/FilteredEstates";
import FreeTrial from "./components/stateless/FreeTrial";
import NotFound from "./components/stateless/NotFound";


const Routes = [
    {
        component: Root,
        routes:[
            {
                ...Estate,
                path: "/estate/:estateId",
                exact: true
            },
            {
                ...FilteredEstates,
                path: "/filter/:filter/:groupId",
                exact: true
            },
            {
                component: FreeTrial,
                path: "/trial",
                exact: true
            },
            {
                ...Estates,
                path: "/",
                exact: true
            },
            {
                component: NotFound
            }
        ]
    }
];

export default Routes;