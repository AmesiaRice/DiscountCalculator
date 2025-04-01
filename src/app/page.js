"use client"
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
    { min: 16, max: 1000, discount: 0 },
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

export default function DiscountCalculator() {
  const [dealer, setDealer] = useState({
    name: "",
    volume: "",
    usance: "",
    display: "",
  });

  const volumeDiscount = calculateDiscount(dealer.volume, "volume");
  const usanceBonus = calculateDiscount(dealer.usance, "usance");
  const total = baseDiscount + volumeDiscount + usanceBonus + dealer.display;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🎯 Price List Discount Calculator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <input
    type="text"
    placeholder="Enter Dealer Name (e.g., Saifco Traders)"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    value={dealer.name}
    onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
  />
  <input
    type="text"
    placeholder="Weekly Off-take in bags ( vloume discount)"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    value={dealer.volume}
    onChange={(e) =>
      setDealer({ ...dealer, volume: parseFloat(e.target.value) || 0 })
    }
  />
  <input
    type="text"
    placeholder="Payment Usance in days (Usance Bonus)"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    value={dealer.usance}
    onChange={(e) =>
      setDealer({ ...dealer, usance: parseFloat(e.target.value) || 0 })
    }
  />
  <input
    type="text"
    placeholder="Display Account % contribution (e.g., 1)"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
    value={dealer.display}
    onChange={(e) =>
      setDealer({ ...dealer, display: parseFloat(e.target.value) || 0 })
    }
  />
</div>


      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-50 text-blue-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Base Discount %</th>
              <th className="px-4 py-3 text-left">Volume Discount %</th>
              <th className="px-4 py-3 text-left">Usance Bonus %</th>
              <th className="px-4 py-3 text-left">Display Account %</th>
              <th className="px-4 py-3 text-left">Total Discount %</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3">{baseDiscount}</td>
              <td className="px-4 py-3">{volumeDiscount}</td>
              <td className="px-4 py-3">{usanceBonus}</td>
              <td className="px-4 py-3">{dealer.display}</td>
              <td className="px-4 py-3 font-semibold text-green-600">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
