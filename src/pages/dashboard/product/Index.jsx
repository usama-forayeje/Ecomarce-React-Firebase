import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";

export default function IndexProduct() {
  const { products } = useSelector((store) => store.products);
  const { categories } = useSelector((store) => store.categories);
  const navigate = useNavigate();

  const updatedProducts = products.map((item) => {
    let findCat = categories.find((d) => d.id == item.productCategory);
    return {
      ...item,
      productCategory: findCat?.categoryName,
    };
  });

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Our Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button onClick={() => navigate("/dashboard/create-product")}>
              Add Product
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.productCategory}</TableCell>
                  <TableCell>${product.productPrice}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          navigate(`/dashboard/edit-product/${product.id}`)
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
