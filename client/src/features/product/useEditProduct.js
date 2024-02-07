import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = () => {
  return useMutation({
    mutationFn: async (body) => {
      const editProduct = await axiosInstance.patch(
        `/products/${body.id}`,
        body
      );

      return editProduct;
    },
  });
};
