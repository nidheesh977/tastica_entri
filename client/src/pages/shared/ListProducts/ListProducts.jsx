import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardProduct } from "../../../components/shared/ListCardProduct/ListCardProduct";

export const ListProducts = () => {
  return (
    <>
      <SideBar />
      <div className="m-2 my-10 md:flex justify-center items-center md:m-5 xl:m-20 ">
        <ListCardProduct />
      </div>
    </>
  );
};
