import Properties from "./components/Properties";
import Header from "./components/stateless/Header";
import NotFound from "./components/stateless/NotFound";
import Property from "./components/Property";

export default [
    {
        ...Header,
        routes:[
            {
                ...Properties,
                path: "/",
                exact: true
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

 