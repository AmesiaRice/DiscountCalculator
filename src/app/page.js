"use client"
import React, { useState } from "react";

const baseDiscount = 16; // Base discount is fixed for everyone

const discountRules = {
  volume: [
    { min: 0, max: 5, discount: 0 },
    { min: 5.01, max: 10, discount: 0.5 },
    { min: 10.01, max: 15, discount: 1 },
    { min: 15.01, max: 20, discount: 2 },
    { min: 20.01, max: 30, discount: 2.5 },
    { min: 30.01, max: 50, discount: 3 },
    { min: 50.01, max: 1000, discount: 4 }
  ],
  usance: [
    { min: 0, max: 0, discount: 4 },
    { min: 1, max: 7, discount: 2 },
    { min: 8, max: 15, discount: 0 },
    { min: 16, max: 1000, discount: 0 }
  ]
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
    volume: 0,
    usance: 0,
    display: 1
  });

  const volumeDiscount = calculateDiscount(dealer.volume, "volume");
  const usanceBonus = calculateDiscount(dealer.usance, "usance");
  const total = baseDiscount + volumeDiscount + usanceBonus + dealer.display;

  return (
    <div className="p-4 max-w-3xl mx-auto lg:mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Price List Discount Calculator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Dealer Name"
          className="border p-2 rounded w-full"
          value={dealer.name}
          onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Weekly Off-take (bags)"
          className="border p-2 rounded w-full"
          value={dealer.volume}
          onChange={(e) => setDealer({ ...dealer, volume: parseFloat(e.target.value) || 0 })}
        />
        <input
          type="number"
          placeholder="Payment Usance (Days)"
          className="border p-2 rounded w-full"
          value={dealer.usance}
          onChange={(e) => setDealer({ ...dealer, usance: parseFloat(e.target.value) || 0 })}
        />
        <input
          type="number"
          placeholder="Display Account %"
          className="border p-2 rounded w-full"
          value={dealer.display}
          onChange={(e) => setDealer({ ...dealer, display: parseFloat(e.target.value) || 0 })}
        />
      </div>

      <table className="table-auto w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Base Discount %</th>
            <th className="border p-2">Volume Discount %</th>
            <th className="border p-2">Usance Bonus %</th>
            <th className="border p-2">Display Account %</th>
            <th className="border p-2">Total Discount %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 text-center">{baseDiscount}</td>
            <td className="border p-2 text-center">{volumeDiscount}</td>
            <td className="border p-2 text-center">{usanceBonus}</td>
            <td className="border p-2 text-center">{dealer.display}</td>
            <td className="border p-2 text-center font-semibold">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
