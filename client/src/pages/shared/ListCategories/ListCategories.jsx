import { useSelector } from "react-redux";
import { ListCardCategory } from "../../../components/shared/ListCardCategory/ListCardCategory";

export const ListCategories = () => {
  const permissions = useSelector(
    (state) => state?.auth?.adminData?.permissions
  );
  return (
    <>
      <div className="m-2 my-10 md:flex items-center justify-center mt-10">
        <ListCardCategory permissions={permissions} />
      </div>
    </>
  );
};
