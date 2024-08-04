// import { PropsWithChildren, ReactElement } from "react";
// import { render, RenderResult } from "@testing-library/react";
// import { RouterProvider, createMemoryRouter, RouteObject, MemoryRouter } from "react-router-dom";
// import SignUp from "@/pages/sign-up";

// interface RenderWithRouterOptions {
//   children: {
//     path: string;
//     element: ReactElement;
//   };
//   routes?: RouteObject[];
// }
// export function renderWithRouter({
//   children,
//   routes = []
// }: RenderWithRouterOptions): RenderResult {

//   const route = {
//     path: children.path || "/",
//     element: children.element,
//   }

//   const router = createMemoryRouter([{ ...route }, ...routes], {
//     initialEntries: [route.path],
//     initialIndex: 1,
//   });

//   return render(<RouterProvider router={router} />);
// }


import { ReactElement } from "react";
import { render, RenderResult } from "@testing-library/react";
import { Wrapper } from "./wrapper";

export const renderWithRouter = (ui: ReactElement, initialPath?: string): RenderResult => {
  return render(ui, { wrapper: (props) => <Wrapper {...props} initialPath={initialPath} /> });
}
