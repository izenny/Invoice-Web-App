import React, { useState } from "react";
import ItemsTable from "./ItemsTable";
import { useDispatch, useSelector } from "react-redux";
import { invoiceLists } from "../Redux/InvoiceRedux";

const CreateInvoice = ({displaycreateInvoice}) => {
  const [addItem, setAddItem] = useState(false); // show item table
  const [selectedItem, setSelectedItem] = useState([]);
  const [name,setName] = useState('')
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);
  const invoicelength = invoices.length > 0 ? parseInt(invoices[invoices.length - 1].invoiceId) + 1 : 1001;
  console.log("length", invoicelength);
  //date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  
  //select item function
  const handleItemSelect = (data) => {
    setSelectedItem([...selectedItem, data]);
    setAddItem(!addItem);
    console.log(selectedItem);
  };

  const totalPrice = selectedItem.reduce(
    (total, item) => total + item.price,
    0
  );
  const totalTax = Math.ceil(selectedItem.reduce(
    (tax, item) => tax + item.price * 0.05,
    0) * 100) / 100;
  const grandTotal = totalPrice + totalTax;

  const invoiceDispatch = ()=>{
    const payload = {
      invoiceId : invoicelength,
      date : formattedDate,
      customerName : name,
      total : totalPrice,
      tax : totalTax,
      grandTotal : grandTotal,
      items : selectedItem

    }
    dispatch(invoiceLists(payload))
    displaycreateInvoice();
  }
  return (
    <div className="bg-rose-200 h-5/6 flex flex-col justify-between ">
      <div className="bg-rose-600 h-8 text-lg text-white pl-2 flex items-center">
        <h1>Create Invoice</h1>
      </div>

      <div className="">
        <div className="flex justify-around p-5 ">
          <div>
            <label htmlFor="" className="mr-2">
              Invoice No :
            </label>
            <input
              type="text"
              readOnly
              className="h-8 px-2 border w-24 border-gray-300 rounded outline-none"
              value={invoicelength}
            />
          </div>
          <div>
            <label htmlFor="" className="mr-2">
              Date :
            </label>
            <input
              type="text"
              readOnly
              className="h-8 px-2 border w-28 border-gray-300 rounded outline-none"
              value={formattedDate}
            />
          </div>
          <div>
            <label htmlFor="" className="mr-2">
              Customer Name :
            </label>
            <input
              type="text"
              className="h-8 px-2 border border-gray-300 rounded outline-none"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
        </div>
        <div className="relative flex p-3  justify-end">
          <button
            onClick={() => setAddItem(true)}
            className="bg-red-600 w-20 text-white h-8 "
          >
            Add
          </button>

          {/* <button onClick={()=>handleItemSelect()} className="bg-red-600 w-20 text-white h-8 ">Add</button> */}
          {addItem && (
            <div className="absolute  mt-4 z-10 w-2/3 ">
              <ItemsTable onItemSelect={handleItemSelect} />
            </div>
          )}
        </div>
      </div>
      <div className="h-1/3 overflow-y-auto">
        <table className="w-full ">
          <thead className="sticky top-0 bg-rose-500 border border-gray-300">
            <tr className="">
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody className="">
            {selectedItem.length > 0 &&
              selectedItem.map((items, index) => (
                <tr key={index} className="bg-rose-300 border border-gray-300">
                  <td className="text-center">{items.id}</td>
                  <td className="text-center">{items.name}</td>
                  <td className="text-center">{items.price}</td>
                  <td className="text-center">5.00%</td>
                  <td className="text-center">
                    {items.price + items.price * 0.05}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-col  items-center">
          <div>
            <label htmlFor="" className="mr-5">
              Total Price{" "}
            </label>
            <input
              type="text"
              readOnly
              className="h-8 px-2 text-right w-24 border border-gray-300 rounded outline-none"
              value={totalPrice}
            />
          </div>
          <div>
            <label htmlFor="" className="mr-9">
              Total Tax
            </label>
            <input
              type="text"
              readOnly
              className="h-8 px-2 border text-right w-24 border-gray-300 rounded outline-none"
              value={totalTax}
            />
          </div>
          <div>
            <label htmlFor="" className="mr-4">
              Grand Total
            </label>
            <input
              type="text"
              readOnly
              className="h-8 px-2 text-right w-24 border border-gray-300 rounded outline-none"
              value={grandTotal}
            />
          </div>
        </div>
        <div className="flex p-3 w-full justify-end">
          <button onClick={invoiceDispatch} className="bg-red-600 w-20 text-white h-8  ">Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
