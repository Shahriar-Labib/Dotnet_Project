import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children:[
            {path: 'activities',element:<ActivityDashboard/>},
            {path: 'activities/:id',element:<ActivityDetails/>},
            {path: 'addActivity',element:<ActivityForm key='add'/>},
            {path: 'manage/:id',element:<ActivityForm key='manage' />},
            {path: 'errors',element:<TestErrors/>},
        ]
    },
]

export const router = createBrowserRouter(routes);