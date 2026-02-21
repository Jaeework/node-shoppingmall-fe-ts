import Button from "../../../components/ui/atoms/button/Button";

interface DeleteItemDialogProps {
  itemName: string;
  showDialog: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteItemDialog = ({
  itemName,
  showDialog,
  onConfirm,
  onCancel,
}: DeleteItemDialogProps) => {
  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-heading">Delete Item</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            onClick={onCancel}
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-gray-700 font-monoplex text-center">
            <span className="font-bold">{itemName}</span>을(를) 삭제하시겠습니까?
          </p>
        </div>

        <div className="flex justify-center gap-3 px-6 py-4 border-t">
          <Button
            type="button"
            variant="black"
            size="md"
            radius="md"
            onClick={onConfirm}
          >
            <span className="text-[var(--background)] font-heading">Delete</span>
          </Button>
          <Button
            type="button"
            variant="chrome"
            size="md"
            radius="md"
            onClick={onCancel}
          >
            <span className="text-[var(--background)] font-heading">Cancel</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemDialog;
