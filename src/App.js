// REACT ROUTER
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// COMPONENTS
import Root from "./pages/root/Root";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import NotFound from "./pages/error/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="details/:nameParam" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
