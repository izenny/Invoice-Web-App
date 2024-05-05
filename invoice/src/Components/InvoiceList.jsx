import React, { useState } from "react";
import { useSelector } from "react-redux";
import InvoiceTable from "./InvoiceTable";
import CreateInvoice from "./CreateInvoice";

const InvoiceList = () => {
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const invoices = useSelector((state) => state.invoices.invoices);

  const displayCreateInvoice = () => {
    setShowCreateInvoice(!showCreateInvoice);
  };

  const searchInvoice = () => {
    const filtered = invoices.filter((invoice) =>
      invoice.customerName.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div>
      <div className="bg-rose-600 h-9 flex items-center">
        <h1 className="text-2xl ml-5 text-white">Invoice</h1>
      </div>
      <div className="bg-rose-400 flex justify-around h-11 items-center">
        <div>
          <button
            onClick={() => setShowCreateInvoice(true)}
            className="bg-red-600 w-20 text-white h-8"
          >
            Create
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setSearchTxt(e.target.value)}
            className="mr-4 h-8 px-2 border border-gray-300 rounded outline-none"
          />
          <button
            onClick={searchInvoice}
            className="bg-red-600 w-20 text-white h-8"
          >
            Search
          </button>
        </div>
      </div>
      <div className="">
        <InvoiceTable
          invoices={searchTxt.length > 0 ? filteredInvoices : invoices}
        />
      </div>
      {showCreateInvoice && (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-full  w-full flex justify-center items-center">
          <CreateInvoice displaycreateInvoice={displayCreateInvoice} />
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
