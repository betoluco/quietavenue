import Root from "./Root";
import Estate from "./estate/Estate";
import Estates from "./estates/Estates";
import FreeTrial from "./freeTrial/FreeTrial";
import NotFound from "./notFound/NotFound";
import Contact from "./contact/Contact";


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
                component: FreeTrial,
                path: "/trial",
                exact: true
            },
            {
                component: Contact,
                path: "/contact",
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