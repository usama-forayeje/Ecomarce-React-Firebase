import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { removeDataFromFirebase } from "../../../database/firebaseUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Trash, Pencil, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { getCategories } from "../../../features/categories/categorySlice";

export default function IndexCategory() {
  const { categories } = useSelector((store) => store.categories);
  const navigate = useNavigate();
  const [deleteCategoryId, setDeleteCategoryId] = useState(false);
  const dispatch = useDispatch();


  const handleAdd = () => {
    navigate("/dashboard/create-category");
  };

  const handleEdit = (data) => {
    navigate(`/dashboard/edit-category/${data.id}`);
  };

  const handleDelete = () => {
    if (deleteCategoryId) {
      async function deleteCat() {
        await removeDataFromFirebase("categories/" + deleteCategoryId);
        // dispatch(deleteCategory(deleteCategoryId));
      }
      deleteCat();
      setDeleteCategoryId(false);
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Our Categories</h1>
        <Button
          onClick={handleAdd}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories &&
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(category)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Pencil />
                      Edit
                    </Button>
                    <Button
                      onClick={() => setDeleteCategoryId(category.id)}
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Trash />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {deleteCategoryId && (
        <AlertDialog
          open={true}
          onOpenChange={() => setDeleteCategoryId(false)}
        >
          <AlertDialogContent>
            {/* Accessible Title */}
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this category? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteCategoryId(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}