import type { Product } from "../../../types";

interface ProductTableProps {
  header: string[];
  data: Product[] | string;
  deleteItem: (id: string) => void;
  openEditForm: (product: Product) => void;
}

const currencyFormat = (value: number) => {
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const ProductTable = ({ header, data, deleteItem, openEditForm }: ProductTableProps) => {
  const productList: Product[] = Array.isArray(data) ? data : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {header.map((title, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productList.length > 0 ? (
            productList.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-3">{index}</td>
                <td className="px-4 py-3">{item.sku}</td>
                <td className="px-4 py-3" style={{ minWidth: "100px" }}>
                  {item.name}
                </td>
                <td className="px-4 py-3">₩ {currencyFormat(item.price)}</td>
                <td className="px-4 py-3">
                  {Object.keys(item.stock).map((size, idx) => (
                    <div key={idx}>
                      {size}: {item.stock[size]}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3">
                  <img src={item.image} width={100} alt="product" />
                </td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3" style={{ minWidth: "100px" }}>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded mr-1"
                    onClick={() => deleteItem(item._id)}
                  >
                    -
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                    onClick={() => openEditForm(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={header.length}
                className="px-4 py-8 text-center text-gray-500"
              >
                No Data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
