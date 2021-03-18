import Properties from "./components/Properties";
import Header from "./components/stateless/Header";
import Property from "./components/Property";
import filterProperties from "./components/filterProperties";
import Root from "./components/stateless/Root";

const Routes = [
    {
        component: Root,
        routes:[
            {
                ...Property,
                path: "/property/:id"
            },
            {
                component: Header,
                path:"/",
                routes:[
                    {
                        ...filterProperties,
                        path: "/filter"
                    },
                    {
                        ...Properties
                    }
                ]
            }
        ]
    }
];

export default Routes;

 