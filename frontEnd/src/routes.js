import React from "react"
import Root from "./Root";
import Estate from "./estate/Estate";
import Home from "./home/Home";
import WorkFlow from "./workFlow/WorkFlow";
import NotFound from "./notFound/NotFound";
import Contact from "./contact/Contact";
import Mission from "./mission/Mission";
import FAQ from "./FAQ/FAQ";
import CityFilter from "./filter/CityFilter"
import ZipCodeFilter from "./filter/ZipCodeFilter"

const routes = [
    {
        element: <Root />,
        children: [
            {
                path: "/estate/:estateId/*",
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
                path: "/city/:filterId/:state/:city",
                ...CityFilter
            },
            {
                path: "/zipCode/:filterId/:zipCode",
                ...ZipCodeFilter
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
];

export default routes;