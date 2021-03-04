import Properties from "./components/Properties";
import Header from "./components/stateless/Header";
import Property from "./components/Property";
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
                        ...Properties,
                        path: "/filter/:city",
                    },
                    
                    {
                        ...Properties,
                    }
                ]
            }
        ]
    }
   
];

export default Routes;

 