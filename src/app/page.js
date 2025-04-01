"use client";
import React, { useState } from "react";

const baseDiscount = 16;

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
    // { min: 16, max: 1000, discount: 0 },
  ],
};

const calculateDiscount = (value, type) => {
  const ruleSet = discountRules[type];
  for (let rule of ruleSet) {
    if (value >= rule.min && value <= rule.max) {
      return rule.discount;
    }
  }
  return 0;
};

const products = [
  "Saifco Excel (4x5kg)",
  "Saifco Excel (20x1kg)",
  "Saifco Wattan BE (4x5kg)",
  "Saifco Wattan BE (20x1kg)",
  "Saifco Super (4x5kg)",
  "Saifco Gold (4x5kg)",
  "Saifco Amber (4x5kg)",
];

export default function DiscountCalculator() {
  const [dealerName, setDealerName] = useState("");
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [usance, setUsance] = useState(0);
  const [display, setDisplay] = useState(1);

  const totalVolume = quantities.reduce((a, b) => a + b, 0);
  const totalVlumeMonthly = totalVolume * 4;
  const volumeDiscount = calculateDiscount(totalVlumeMonthly, "volume");
  const usanceBonus = calculateDiscount(usance, "usance");
  const totalDiscount = baseDiscount + volumeDiscount + usanceBonus + display;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📦 Monthly Discount Calculator
      </h1>

      {/* <input
        type="text"
        placeholder="Enter Dealer Name (e.g., Saifco Traders)"
        className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        value={dealerName}
        onChange={(e) => setDealerName(e.target.value)}
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {products.map((product, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {product}
            </label>
            <input
              type="number"
              placeholder="Enter quantity (bags)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={quantities[index]}
              onChange={(e) => {
                const newQuantities = [...quantities];
                newQuantities[index] = parseFloat(e.target.value) || 0;
                setQuantities(newQuantities);
              }}
            />
          </div>
        ))}
      </div>

      {/* ✅ NEW SECTION: Total Volume Display */}
      <p className="text-lg font-semibold text-gray-700 mb-6">
        🧮 Total Weekly Off-take:{" "}
        <span className="text-blue-600 font-bold">{totalVolume} bags</span>
      </p>
      <p className="text-lg font-semibold text-gray-700 mb-6">
        🧮 Total Monthly Off-take:{" "}
        <span className="text-blue-600 font-bold">{totalVolume * 4} bags</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Payment Usance (Days)
          </label>
          <select
            value={usance}
            onChange={(e) => setUsance(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="0">0 Days</option>
            <option value="5">1-7 Days</option>
            <option value="10">8-15 Days</option>
            {/* <option value="20">16+ Days</option> */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Display Account?
          </label>
          <select
            value={display}
            onChange={(e) => setDisplay(e.target.value === "1" ? 1 : 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-50 text-blue-700 text-xs uppercase">
            <tr>
              {/* <th className="px-4 py-3 text-left">Base %</th>
              <th className="px-4 py-3 text-left">Volume %</th>
              <th className="px-4 py-3 text-left">Usance %</th>
              <th className="px-4 py-3 text-left">Display %</th> */}
              <th className="px-4 py-3 text-left">Total %</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              {/* <td className="px-4 py-3">{baseDiscount}</td>
              <td className="px-4 py-3">{volumeDiscount}</td>
              <td className="px-4 py-3">{usanceBonus}</td> */}
              {/* <td className="px-4 py-3">{display}</td> */}
              <td className="px-4 py-3 font-semibold text-green-600">
                {totalDiscount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
