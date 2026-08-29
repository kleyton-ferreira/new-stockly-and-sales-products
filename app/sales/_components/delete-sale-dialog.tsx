"use client";

import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteProductDialogProps {
  salesId: string;
}

const DeleteSalectDialog = ({ salesId }: DeleteProductDialogProps) => {
  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar venda.");
    },
  });

  const handleConfirmationDelete = () => execute({ id: salesId });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-textColor-primary">
          Você tem certeza?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir o produto ação não pode ser desfeita.
          Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-2">
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleConfirmationDelete}
          className="bg-textColor-primary hover:bg-textColor-hover"
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteSalectDialog;
