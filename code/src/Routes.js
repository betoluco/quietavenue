import Root from "./Root";
import Estate from "./estate/Estate";
import Home from "./home/Home";
import WorkFlow from "./workFlow/WorkFlow";
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
                component: WorkFlow,
                path: "/workFlow",
                exact: true
            },
            {
                component: Contact,
                path: "/contact",
                exact: true
            },
            {
                ...Home,
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