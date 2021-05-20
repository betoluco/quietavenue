import Properties from "./components/Properties";
import PropertiesHeader from "./components/stateless/PropertiesHeader";
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
                component: PropertiesHeader,
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

 