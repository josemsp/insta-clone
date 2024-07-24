import { Outlet, RouteObject } from "react-router-dom"
import ErrorPage from "./pages/error-page";
import Contact from "./contact";

export const router: RouteObject[] = [
  {
    path: "/",
    element: <div>
      <div id="detail">
        <Outlet />
      </div>
    </div>,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <div>Hello !</div> },
      { path: "login", element: <div>login!</div> },
      { path: "register", element: <div>register!</div> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ]
  },
  
];
