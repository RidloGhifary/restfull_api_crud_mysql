import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProduct = ({ onError }) => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products");
      return data;
    },
    queryKey: ["fetch.products"],
    onError,
  });

  return {
    products,
    isLoading,
    refetch,
  };
};
