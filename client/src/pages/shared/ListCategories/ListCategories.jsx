import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardCategory } from "../../../components/shared/ListCardCategory/ListCardCategory";

export const ListCategories = () => {
  return (
    <>
      <SideBar />
      <div className="md:flex items-center justify-center mt-10">
        <ListCardCategory />
      </div>
    </>
  );
};
