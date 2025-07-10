import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { useParams } from "react-router-dom";

export const Barcode = () => {
  const { customerId } = useParams();
  const [barcodeUrl, setBarcodeUrl] = useState(null);

  const displayBarcode = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/customer/barcode/${customerId}/image`,
        responseType: "blob",
        withCredentials: true,
      });

      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setBarcodeUrl(url);
    } catch (error) {
      console.log(error?.response?.data?.message || "Error fetching barcode");
    }
  };

  useEffect(() => {
    displayBarcode();

    return () => {
      if (barcodeUrl) URL.revokeObjectURL(barcodeUrl);
    };
  }, []);

  return (
    <div className="text-center mt-10">
      {barcodeUrl ? (
        <>
          <img src={barcodeUrl} alt="Barcode" className="mx-auto mb-2" />
        </>
      ) : (
        <p>Loading barcode...</p>
      )}
    </div>
  );
};
