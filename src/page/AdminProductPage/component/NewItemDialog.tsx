import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import CloudinaryUploadWidget from "../../../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS, SIZE } from "../../../constants/product.constants";
import {
  clearError,
  createProduct,
  editProduct,
} from "../../../features/product/productSlice";
import Button from "../../../components/ui/atoms/button/Button";
import ErrorMessage from "../../../components/ui/atoms/error-message/ErrorMessage";
import type { Product } from "../../../types";

interface NewItemDialogProps {
  mode: "new" | "edit";
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

type FormData = Omit<Product, "_id" | "createdAt" | "isDeleted">;

const InitialFormData: FormData = {
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
  const [priceError, setPriceError] = useState(false);

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
    setStockError(false);
    setPriceError(false);
    setStock([]);
    dispatch(clearError());
    setShowDialog(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //재고를 입력했는지 확인, 아니면 에러
    const hasStockError = stock.length === 0;
    const hasPriceError = formData.price <= 0;
    setStockError(hasStockError);
    setPriceError(hasPriceError);
    if (hasStockError || hasPriceError) return;
    // 재고를 배열에서 객체로 바꿔주기
    const totalStock = stock.reduce((prev, item) => {
      return { ...prev, [item[0]]: item[1]};
    }, {});
    if (mode === "new") {
      //새 상품 만들기
      dispatch(createProduct({ ...formData, stock: totalStock }));
    } else {
      // 상품 수정하기
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const addStock = () => {
    setStock([ ...stock, ["", 0] ]);
  };

  const deleteStock = (idx: number) => {
    const newStock = stock.filter((item, index) => index !== idx );
    setStock(newStock);
  };

  const handleSizeChange = (value: string, index: number) => {
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value: string, index: number) => {
    if(isNaN(Number(value))) return;
    const newStock = [...stock];
    newStock[index][1] = Number(value);
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
          <h2 className="text-lg font-heading">
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
            <ErrorMessage message={error} variant="y2k" className="mb-4" />
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-heading text-gray-700 mb-1">
                  Sku
                </label>
                <input
                  id="sku"
                  type="text"
                  placeholder="Enter Sku"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
                  onChange={handleChange}
                  required
                  value={formData.sku}
                />
              </div>
              <div>
                <label className="block text-sm font-heading text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
                  onChange={handleChange}
                  required
                  value={formData.name}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-heading text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
                onChange={handleChange}
                rows={3}
                value={formData.description}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-heading text-gray-700">
                  Stock
                </label>
                {stockError && (
                  <span className="text-red-500 text-sm">재고를 추가해주세요</span>
                )}
                <Button
                  type="button"
                  size="sm"
                  radius="md"
                  onClick={addStock}
                >
                  <span className="text-[var(--background)] font-heading">Add +</span>
                </Button>
              </div>
              <div>
                {stock.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 flex items-center">
                      <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
                        onChange={(event) =>
                          handleSizeChange(event.target.value, index)
                        }
                        required
                        value={item[0] ? item[0].toLowerCase() : ""}
                      >
                        <option value="" disabled hidden>
                          Select Size
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
                    <div className="col-span-6 flex items-center">
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
                        placeholder="number of stock"
                        value={item[1]}
                        onChange={(event) =>
                          handleStockChange(event.target.value, index)
                        }
                        required
                      />
                    </div>
                    
                    <div className="col-span-2 flex items-center">
                      <Button
                        type="button"
                        size="sm"
                        radius="md"
                        variant="black"
                        onClick={() => deleteStock(index)}
                      >
                        <span className="text-[var(--background)] font-heading">-</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-heading text-gray-700 mb-1">
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
                <label className="block text-sm font-heading text-gray-700 mb-1">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
                  value={formData.price}
                  required
                  onChange={handleChange}
                />
                {priceError && (
                  <span className="text-red-500 text-sm font-monoplex">가격을 입력해주세요.</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-heading text-gray-700 mb-1">
                  Category
                </label>
                <select
                  multiple
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
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
                <label className="block text-sm font-heading text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 font-monoplex"
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

            <Button
              type="submit"
              variant="purple-vivid"
              size="lg"
              radius="md"
            >
              <h1 className="text-[var(--background)] font-heading">{mode === "new" ? "Submit" : "Edit"}</h1>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItemDialog;
