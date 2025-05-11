import { useCategories } from "../../../hooks/useCategories";

export const Category = () => {
  const { categories, setCategoryId, setIsCategoryClicked, isCategoryClicked } =
    useCategories();

  return (
    <>
      {categories?.map((category) => (
        <div
          key={category?._id}
          className="bg-[#E8F9FF] font-semibold border my-1 cursor-pointer hover:bg-opacity-50 shadow-2xl rounded-lg p-5"
        >
          <p
            onClick={() => {
              setCategoryId(category?._id);
              setIsCategoryClicked(!isCategoryClicked);
            }}
            key={category?._id}
          >
            {category?.categoryName}
          </p>
        </div>
      ))}
    </>
  );
};
