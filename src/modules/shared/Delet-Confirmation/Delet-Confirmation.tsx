
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import deletePhoto from "../../../assets/images/delete-Bsk_QjHJ.png";
interface DeleteConfirmationProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  itemType: string; 
  handleDelete: () => void;
}
export default function DeletConfirmation({
  openDialog,
  setOpenDialog,
  itemType,
  handleDelete,
}: DeleteConfirmationProps) {
  const [loading, setLoading] = useState(false); 
  const handleConfirmDelete = async () => {
    setLoading(true);
    await handleDelete(); 
    setLoading(false); 
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {itemType}</DialogTitle>

              <img
                src={deletePhoto}
                alt="Warning"
                className="mx-auto mb-4 w-70 h-70"
              />
              <DialogDescription>
                This action cannot be undone. This will permanently delete the {itemType}.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <button
                onClick={handleConfirmDelete}
                disabled={loading} 
                className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:opacity-90 transition `}
              >
                {loading ? (
                  "Deleting..."
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
