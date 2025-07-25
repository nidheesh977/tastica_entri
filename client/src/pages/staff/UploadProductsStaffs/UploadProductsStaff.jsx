import { CSVCard } from "../../../components/admin/CSVCard/CSVCard";
import { useFileUploads } from "../../../hooks/useFileUploads";

export const UploadProductsStaff = () => {
  const { uploadProductsCSVFile } = useFileUploads();
  return (
    <>
      <div className="m-2">
        <CSVCard uploadCSVFile={uploadProductsCSVFile} title="Products" />
      </div>
    </>
  );
};
