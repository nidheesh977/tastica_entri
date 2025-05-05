import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardCategory } from "../../../components/shared/ListCardCategory/ListCardCategory";

export const ListCategories = () => {
  return (
    <>
      <SideBar />
      <div className="m-2 my-10 md:flex items-center justify-center mt-10">
        <ListCardCategory />
      </div>
    </>
  );
};
