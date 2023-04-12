import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import SharedLayout from "./layouts/SharedLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SharedLayout />}>
      <Route index element={<Login />} />
      <Route path="/schedule/:id" element={<Schedule />}></Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
