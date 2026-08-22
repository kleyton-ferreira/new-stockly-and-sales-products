import { deleteProduct } from "@/app/_actions/delete-product";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";

interface DeleteProductDialogProps {
  productsName: string;
  productId: string;
}

const DeleteProductDialog = ({
  productsName,
  productId,
}: DeleteProductDialogProps) => {
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto excluído com sucesso.");
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir um produto.");
      console.log(error);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-textColor-primary">
          Você tem certeza?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir o produto{" "}
          <strong className="text-textColor-primary">{productsName}</strong>.
          Esta ação não pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-2">
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDeleteProduct}
          className="bg-textColor-primary hover:bg-textColor-hover"
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialog;
