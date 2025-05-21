import { useState } from "react";
import { FaFileCsv } from "react-icons/fa";
import { useFileUploads } from "../../../hooks/useFileUploads";

export const CSVCard = ({ uploadCSVFile, isLoading, title }) => {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", csvFile);
    uploadCSVFile(formData);
  };
  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-2
                my-10  w-[500px] h-80 p-10   md:px-10 bg-tertiary text-primary shadow-2xl rounded-lg"
        >
          <h1 className="text-3xl mb-6 font-thin text-center text-primary ">
            Upload {title} CSV File
          </h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-primary "></label>
            <div className="relative flex items-center justify-center border-2  border-primary rounded-lg p-4 bg-tertiary hover:bg-orange-100 transition">
              <input
                type="file"
                name="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-sm text-primary font-medium flex items-center gap-2">
                <FaFileCsv className="text-lg" /> Choose CSV file
              </span>
            </div>
          </div>
          {isLoading && <p className="text-primary">Loading..</p>}
          <button
            onClick={() => handleUpload()}
            className="p-4 my-2  bg-primary hover:opacity-90 w-full text-white rounded-lg"
          >
            <span className="flex items-center justify-center gap-2 font-semibold">
              Upload <FaFileCsv />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
