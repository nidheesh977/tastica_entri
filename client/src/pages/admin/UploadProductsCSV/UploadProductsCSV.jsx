import { CSVCard } from "../../../components/admin/CSVCard/CSVCard";
import { useFileUploads } from "../../../hooks/useFileUploads";

export const UploadProductsCSV = () => {
  const { uploadProductsCSVFile, isLoading } = useFileUploads();
  return (
    <>
   
      <div className="m-2">
        <CSVCard uploadCSVFile={uploadProductsCSVFile} isLoading={isLoading} title='Products' />
      </div>
    </>
  );
};
