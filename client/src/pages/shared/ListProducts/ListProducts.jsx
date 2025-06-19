import { useSelector } from "react-redux";
import { ListCardProduct } from "../../../components/shared/ListCardProduct/ListCardProduct";

export const ListProducts = () => {
  const permissions = useSelector(
    (state) => state?.auth?.adminData?.permissions
  );
  return (
    <>
      <div className="m-2 my-10 md:flex justify-center items-center md:m-5 xl:m-20 ">
        <ListCardProduct permissions={permissions} />
      </div>
    </>
  );
};
