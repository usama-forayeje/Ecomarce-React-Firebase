import { useForm } from "react-hook-form";
import { productFormSchema } from "../../../validation/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  getFirebaseDataForEdit,
  setDataToFirebase,
  updateDataFromFirebase,
} from "../../../database/firebaseUtils";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateProduct() {
  const navigate = useNavigate();
  const params = useParams();

  const { categories } = useSelector((store) => store.categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      productName: "",
      productPrice: "",
      productImageUrl: "",
      productCategory: "",
    },
  });

  const onSubmit = (data) => {
    if (params.id) {
      // Update product
      updateDataFromFirebase(`products/${params.id}`, data);
    } else {
      // Create product
      setDataToFirebase("products", data);
    }

    reset();
    navigate("/dashboard/index-product");
  };

  useEffect(() => {
    async function getData() {
      const res = await getFirebaseDataForEdit("products/" + params.id);
      reset(res);
    }

    if (params.id) {
      getData();
    } else {
      reset();
    }
  }, [params, reset]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {params.id ? "Edit Product" : "Add Product"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                type="text"
                id="productName"
                placeholder="Enter product name"
                {...register("productName")}
              />
              {errors.productName && (
                <span className="text-sm text-red-500">
                  {errors.productName?.message}
                </span>
              )}
            </div>

            {/* Product Category */}
            <div>
              <Label htmlFor="productCategory">Product Category</Label>
              <Select
                onValueChange={(value) => {
                  reset((prev) => ({ ...prev, productCategory: value }));
                }}
                value={categories.find((cat) => cat.id === categories.productCategory)?.id || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.productCategory && (
                <span className="text-sm text-red-500">
                  {errors.productCategory?.message}
                </span>
              )}
            </div>

            {/* Product Price */}
            <div>
              <Label htmlFor="productPrice">Product Price</Label>
              <Input
                type="number"
                id="productPrice"
                placeholder="Enter product price"
                {...register("productPrice")}
              />
              {errors.productPrice && (
                <span className="text-sm text-red-500">
                  {errors.productPrice?.message}
                </span>
              )}
            </div>

            {/* Product Image URL */}
            <div>
              <Label htmlFor="productImageUrl">Product Image URL</Label>
              <Input
                type="url"
                id="productImageUrl"
                placeholder="Enter product image URL"
                {...register("productImageUrl")}
              />
              {errors.productImageUrl && (
                <span className="text-sm text-red-500">
                  {errors.productImageUrl?.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {params.id ? "Update" : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
