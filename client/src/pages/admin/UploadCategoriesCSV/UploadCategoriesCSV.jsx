import { CSVCard } from "../../../components/admin/CSVCard/CSVCard";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { useFileUploads } from "../../../hooks/useFileUploads";

export const UploadCategoriesCSV = () => {
  const { uploadCategoriesCSVFile, isLoadingCategories } = useFileUploads();
  return (
    <>
      <SideBar />
      <div className="m-2">
        <CSVCard
          uploadCSVFile={uploadCategoriesCSVFile}
          isLoading={isLoadingCategories}
          title='Categories'
        />
      </div>
    </>
  );
};
