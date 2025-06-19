import { CSVCard } from "../../../components/admin/CSVCard/CSVCard";
import { useFileUploads } from "../../../hooks/useFileUploads";

export const UploadCategoriesStaff = () => {
  const { uploadCategoriesCSVFile } = useFileUploads();
  return (
    <>
      <div className="m-2">
        <CSVCard uploadCSVFile={uploadCategoriesCSVFile} title="Categories" />
      </div>
    </>
  );
};
