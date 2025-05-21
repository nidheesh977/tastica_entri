import { useDispatch } from "react-redux";
import { useCategories } from "../../../hooks/useCategories";
import { saveSearchQuery } from "../../../redux/features/searchSlice";
import { saveCategoryId } from "../../../redux/features/categorySlice";

export const Category = () => {
  const { categories } = useCategories();
  const dispatch = useDispatch();
  return (
    <>
      {categories?.map((category) => (
        <div
          onClick={() => {
            dispatch(saveSearchQuery(""));
            dispatch(saveCategoryId(category?._id));
          }}
          key={category?._id}
          className="bg-tertiary hover:bg-orange-200  font-semibold border my-1 cursor-pointer hover:bg-opacity-50 shadow-2xl rounded-lg p-5"
        >
          <p key={category?._id}>{category?.categoryName}</p>
        </div>
      ))}
    </>
  );
};
