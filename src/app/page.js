"use client";
import React, { useState } from "react";

const baseDiscount = 0;

// Dealer Price List (Box)
2520
2160
2016
1740
1500
2640
2280

const discountRules = {
  volume: [
    { min: 0, max: 5, discount: 0 },
    { min: 5.01, max: 10, discount: 0.5 },
    { min: 10.01, max: 15, discount: 1 },
    { min: 15.01, max: 20, discount: 2 },
    { min: 20.01, max: 30, discount: 2.5 },
    { min: 30.01, max: 50, discount: 3 },
    { min: 50.01, max: 1000, discount: 4 },
  ],
  usance: [
    { min: 0, max: 0, discount: 4 },
    { min: 1, max: 7, discount: 2 },
    { min: 8, max: 15, discount: 0 },
  ],
};

const products = [
  { name: "Saifco Excel (4x5kg)", dealerPrice: 2520 },
  { name: "Saifco Excel (20x1kg)", dealerPrice: 2640 },
  { name: "Saifco Wattan Se (4x5kg)",  dealerPrice: 2160 },
  { name: "Saifco Wattan Se (20x1kg)",  dealerPrice: 2280 },
  { name: "Saifco Super (4x5kg)",  dealerPrice: 2016 },
  { name: "Saifco Gold (4x5kg)",  dealerPrice: 1740 },
  { name: "Saifco Amber (4x5kg)",  dealerPrice: 1500 },
];

const calculateDiscount = (value, type) => {
  const ruleSet = discountRules[type];
  for (let rule of ruleSet) {
    if (value >= rule.min && value <= rule.max) {
      return rule.discount;
    }
  }
  return 0;
};

export default function PriceTable() {
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [usance, setUsance] = useState("0");
  const [display, setDisplay] = useState("1");

  const handleQtyChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseFloat(value) || 0;
    setQuantities(newQuantities);
  };



  const totalWeekly = quantities.reduce((sum, q) => sum + q, 0);
  const totalMonthly = totalWeekly * 4;

  const volumeDiscount = calculateDiscount(totalMonthly, "volume");
  const usanceBonus = calculateDiscount(parseInt(usance), "usance");
  const displayBonus = parseInt(display);

  const totalDiscount = baseDiscount + volumeDiscount + usanceBonus + displayBonus;

  const finalDiscountedPrice = (dealerPrice) => {
    const discountAmount = (dealerPrice * totalDiscount) / 100;
    return (dealerPrice - discountAmount).toFixed(2);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        📦 Product Price Discount Table
      </h1>

      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-blue-50 text-xs text-gray-600 uppercase">
          <tr>
            <th className="px-3 py-2 text-left">Product</th>
            <th className="px-3 py-2 text-left">Qty</th>
            <th className="px-3 py-2 text-left">Dealer Price</th>
            <th className="px-3 py-2 text-left">Final MRP</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="px-3 py-2">{p.name}</td>
              <td className="px-3 py-2">
                <input
                  type="number"
                  value={quantities[i]}
                  onChange={(e) => handleQtyChange(i, e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                />
              </td>
              <td className="px-3 py-2">{p.dealerPrice}</td>
              <td className="px-3 py-2 font-semibold text-green-600">
                ₹{finalDiscountedPrice(p.dealerPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
        <p>
          🧮 <strong>Total Weekly Take:</strong>{" "}
          <span className="text-blue-600 font-semibold">{totalWeekly}</span> bags
        </p>
        <p>
          🗓️ <strong>Total Monthly Take:</strong>{" "}
          <span className="text-blue-600 font-semibold">{totalMonthly}</span> bags
        </p>

        <div>
          <label className="block mb-1 font-medium">Payment Usance (Days)</label>
          <select
            value={usance}
            onChange={(e) => setUsance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="0">0 Days</option>
            <option value="5">1–7 Days</option>
            <option value="10">8–15 Days</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Display Account?</label>
          <select
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>

      {/* ✅ Discount Table Section */}
      <div className="mt-8">
        <table className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-blue-700 text-xs uppercase">
            <tr>
              {/* <th className="px-4 py-3 text-left">Base %</th> */}
              <th className="px-4 py-3 text-left">Volume %</th>
              <th className="px-4 py-3 text-left">Usance %</th>
              <th className="px-4 py-3 text-left">Display %</th>
              <th className="px-4 py-3 text-left">Total %</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t text-center">
              {/* <td className="px-4 py-3">{baseDiscount}</td> */}
              <td className="px-4 py-3">{volumeDiscount}</td>
              <td className="px-4 py-3">{usanceBonus}</td>
              <td className="px-4 py-3">{displayBonus}</td>
              <td className="px-4 py-3 font-semibold text-green-600">
                {totalDiscount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
