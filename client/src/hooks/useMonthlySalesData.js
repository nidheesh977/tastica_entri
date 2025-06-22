import { useQuery } from "@tanstack/react-query";
import { getMonthlySalesData } from "../utils/getMonthlyMonthlySalesData";

export const useMonthlySalesData = (method) =>
  useQuery({
    queryKey: ["monthlySales", method],
    queryFn: () => getMonthlySalesData(method),
    enabled: !!method,
  });
