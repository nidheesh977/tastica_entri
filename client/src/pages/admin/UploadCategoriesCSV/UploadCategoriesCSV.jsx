import { CSVCard } from "../../../components/admin/CSVCard/CSVCard";
import { useFileUploads } from "../../../hooks/useFileUploads";

export const UploadCategoriesCSV = () => {
  const { uploadCategoriesCSVFile, isLoadingCategories } = useFileUploads();
  return (
    <>
      <div className="m-2">
        <CSVCard
          uploadCSVFile={uploadCategoriesCSVFile}
          isLoading={isLoadingCategories}
          title="Categories"
        />
      </div>
    </>
  );
};
