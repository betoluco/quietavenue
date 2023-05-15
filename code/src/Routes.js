import Root from "./Root";
import Estate from "./estate/Estate";
import Home from "./home/Home";
import WorkFlow from "./workFlow/WorkFlow";
import NotFound from "./notFound/NotFound";
import Contact from "./contact/Contact";
import Mission from "./mission/Mission";
import FAQ from "./FAQ/FAQ"


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
                component: Mission,
                path: "/mission",
                exact: true
            },
            {
                component: FAQ,
                path: "/FAQ",
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