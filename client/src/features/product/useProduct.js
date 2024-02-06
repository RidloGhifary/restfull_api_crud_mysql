import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProduct = () => {
  const { data: products, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products");
      return data;
    },
  });

  return {
    products,
    isLoading,
  };
};
