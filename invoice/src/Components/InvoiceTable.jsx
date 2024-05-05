import React from "react";

const InvoiceTable = ({ invoices }) => {
  return (
    <div className="">
      <table className="w-full">
        <thead>
          <tr className="bg-rose-500 border border-gray-300 ">
            <th className="text-center">Invoice No</th>
            <th className="text-center">Date</th>
            <th className="text-center">Customer Name</th>
            <th className="text-center">Total</th>
            <th className="text-center">Tax</th>
            <th className="text-center">Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.invoiceId}
              className="bg-rose-300 border border-gray-300"
            >
              <td className="text-center">{invoice.invoiceId}</td>
              <td className="text-center">{invoice.date}</td>
              <td className="text-center">{invoice.customerName}</td>
              <td className="text-center">{invoice.total}</td>
              <td className="text-center">{invoice.tax}</td>
              <td className="text-center">{invoice.grandTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
