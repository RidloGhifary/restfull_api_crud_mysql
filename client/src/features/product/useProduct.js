import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchingData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axiosInstance.get("/products");
  //     setProducts(data.datas);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchingData();
  // }, []);

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
