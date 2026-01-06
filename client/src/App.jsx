import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useSelector } from "react-redux"
export const App = () => {

  const { isBlur } = useSelector((state) => state.common)


  return (
    <>
      {isBlur === true ? <div className="bg-black opacity-40 w-full min-h-screen top-0 left-0 fixed z-[999]"></div> : ""}
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};
