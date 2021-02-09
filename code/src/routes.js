import Properties from "./components/Properties";
import Header from "./components/stateless/Header";
import NotFound from "./components/stateless/NotFound";
import Property from "./components/Property";

const Routes = [
    {
        ...Header,
        routes:[
            {
                ...Properties,
                path: "/",
                exact: true
            },
            {
                ...Properties,
                path: "/filter/:city"
            },
            {
                ...Property,
                path: "/property/:id"
            },
            {
                ...NotFound
            }
        ]
    }
   
];

export default Routes;

 