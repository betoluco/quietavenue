import React from "react"
import Root from "./Root";
import Estate from "./estate/Estate";
import Home from "./home/Home";
import WorkFlow from "./workFlow/WorkFlow";
import NotFound from "./notFound/NotFound";
import Contact from "./contact/Contact";
import Mission from "./mission/Mission";
import FAQ from "./FAQ/FAQ";

const routes = [
    {
        element: <Root />,
        children: [
            {
                path: "/estate/:estateURL",
                ...Estate
            },
            {
                path: "/workFlow",
                element: <WorkFlow />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/mission",
                element: <Mission />,
            },
            {
                path: "/FAQ",
                element: <FAQ />,
            },
            {
                path: "/",
                ...Home
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
];

export default routes;