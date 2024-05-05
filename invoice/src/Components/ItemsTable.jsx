import React, { useEffect, useState } from "react";
import items from '../Data/Items';

const ItemsTable = ({onItemSelect}) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items);
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchText)
    );
    setFilteredItems(filtered);
  };
 const selectedItems = (item)=>{
  onItemSelect(item);
  console.log(item);
  
 }
  return (
    <div className="flex flex-col  w-full h-80 ">
      <div className="flex justify-end p-5">
        <input
          type="text"
          placeholder="Search..."
          className="h-8 px-2 border border-gray-300 rounded outline-none"
          onChange={handleSearch}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-rose-500 border border-gray-300">
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} onClick={()=>selectedItems(item)} className="bg-rose-300 border hover:cursor-pointer border-gray-300">
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;
