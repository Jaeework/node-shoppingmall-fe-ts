import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import CloudinaryUploadWidget from "../../../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS, SIZE } from "../../../constants/product.constants";
import {
  clearError,
  createProduct,
  editProduct,
} from "../../../features/product/productSlice";

interface NewItemDialogProps {
  mode: "new" | "edit";
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

const InitialFormData = {
  name: "",
  sku: "",
  stock: {} as Record<string, number>,
  image: "",
  description: "",
  category: [] as string[],
  status: "active" as "active" | "disactive",
  price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }: NewItemDialogProps) => {
  const dispatch = useAppDispatch();
  const { error, success, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : { ...InitialFormData, ...selectedProduct }
  );
  const [stock, setStock] = useState<[string, number][]>([]);
  const [stockError, setStockError] = useState(false);

  useEffect(() => {
    if (success) setShowDialog(false);
  }, [success]);

  useEffect(() => {
    if (error || !success) {
      dispatch(clearError());
    }
    if (showDialog) {
      if (mode === "edit" && selectedProduct) {
        setFormData({ ...selectedProduct });
        const sizeArray: [string, number][] = Object.keys(selectedProduct.stock).map(
          (size) => [size, selectedProduct.stock[size]]
        );
        setStock(sizeArray);
      } else {
        setFormData({ ...InitialFormData });
        setStock([]);
      }
    }
  }, [showDialog]);

  const handleClose = () => {
    setFormData({ ...InitialFormData });
    setStock([]);
    setStockError(false);
    dispatch(clearError());
    setShowDialog(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stock.length === 0) {
      setStockError(true);
      return;
    }
    setStockError(false);
    const stockObject: Record<string, number> = {};
    stock.forEach(([size, qty]) => {
      stockObject[size] = qty;
    });
    const payload = { ...formData, stock: stockObject };

    if (mode === "new") {
      dispatch(createProduct(payload));
    } else if (selectedProduct) {
      dispatch(editProduct({ id: selectedProduct._id, ...payload }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const addStock = () => {
    setStock([...stock, ["", 0]]);
  };

  const deleteStock = (idx: number) => {
    const newStock = stock.filter((_, i) => i !== idx);
    setStock(newStock);
  };

  const handleSizeChange = (value: string, index: number) => {
    const newStock = [...stock];
    newStock[index] = [value, newStock[index][1]];
    setStock(newStock);
  };

  const handleStockChange = (value: string, index: number) => {
    const newStock = [...stock];
    newStock[index] = [newStock[index][0], Number(value)];
    setStock(newStock);
  };

  const onHandleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (formData.category.includes(value)) {
      const newCategory = formData.category.filter((item) => item !== value);
      setFormData({ ...formData, category: [...newCategory] });
    } else {
      setFormData({ ...formData, category: [...formData.category, value] });
    }
  };

  const uploadImage = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {mode === "new" ? "Create New Product" : "Edit Product"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sku
                </label>
                <input
                  id="sku"
                  type="text"
                  placeholder="Enter Sku"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                  value={formData.sku}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                  value={formData.name}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                rows={3}
                value={formData.description}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                {stockError && (
                  <span className="text-red-500 text-sm">재고를 추가해주세요</span>
                )}
                <button
                  type="button"
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={addStock}
                >
                  Add +
                </button>
              </div>
              <div>
                {stock.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4">
                      <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event) =>
                          handleSizeChange(event.target.value, index)
                        }
                        required
                        value={item[0] ? item[0].toLowerCase() : ""}
                      >
                        <option value="" disabled hidden>
                          Please Choose...
                        </option>
                        {SIZE.map((sizeItem, idx) => (
                          <option
                            key={idx}
                            value={sizeItem.toLowerCase()}
                            disabled={stock.some(
                              (s, i) =>
                                i !== index &&
                                s[0] === sizeItem.toLowerCase()
                            )}
                          >
                            {sizeItem}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-6">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="number of stock"
                        value={item[1]}
                        onChange={(event) =>
                          handleStockChange(event.target.value, index)
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2 flex items-center">
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                        onClick={() => deleteStock(index)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
              {formData.image && (
                <img
                  id="uploadedimage"
                  src={formData.image}
                  className="mt-2 w-32 h-32 object-cover rounded"
                  alt="uploadedimage"
                />
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.price}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  multiple
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={onHandleCategory}
                  value={formData.category}
                  required
                >
                  {CATEGORY.map((item, idx) => (
                    <option key={idx} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  {STATUS.map((item, idx) => (
                    <option key={idx} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
            >
              {mode === "new" ? "Submit" : "Edit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItemDialog;
