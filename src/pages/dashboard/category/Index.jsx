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
import  fetchCategories  from "../../../features/categories/categorySlice"; // Ensure correct import

export default function IndexCategory() {
  const { categories, loading, error } = useSelector((store) => store.categories); 
  const navigate = useNavigate();
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // Fix initial state to null instead of false
  const dispatch = useDispatch();

  // Add category handler
  const handleAdd = () => {
    navigate("/dashboard/create-category");
  };

  // Edit category handler
  const handleEdit = (data) => {
    navigate(`/dashboard/edit-category/${data.id}`);
  };

  // Delete category handler
  const handleDelete = () => {
    if (deleteCategoryId) {
      async function deleteCat() {
        try {
          await removeDataFromFirebase("categories/" + deleteCategoryId);
          dispatch(fetchCategories()); // Refetch categories after deletion
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      }
      deleteCat();
      setDeleteCategoryId(null); // Reset deleteCategoryId after deletion
    }
  };

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-center">Loading categories...</h2>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-center text-red-500">
          Failed to load categories: {error}
        </h2>
      </div>
    );
  }

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
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No Categories Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete confirmation dialog */}
      {deleteCategoryId && (
        <AlertDialog open={true} onOpenChange={() => setDeleteCategoryId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this category? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setDeleteCategoryId(null)}>
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
