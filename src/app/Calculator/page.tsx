"use client";

import { useState } from "react";

interface CalculationResult {
  turnover: number;
  brokerage: number;
  sttCtt: number;
  transactionCharges: number;
  clearingCharges: number;
  gst: number;
  stampDuty: number;
  sebiFees: number;
  totalCharges: number;
  netBuyValue: number;
  netSellValue: number;
  netPL: number;
}

const CalculatorSection = () => {
  const [tradeType, setTradeType] = useState<"intraday" | "delivery">(
    "intraday"
  );
  const [quantity, setQuantity] = useState<string>("1");
  const [buyPrice, setBuyPrice] = useState<string>("3025.70");
  const [sellPrice, setSellPrice] = useState<string>("3026.80");
  const [brokerageRate, setBrokerageRate] = useState<string>("0.03");

  const calculateCharges = (): CalculationResult => {
    const qty = parseFloat(quantity) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const rate = parseFloat(brokerageRate) || 0;

    // Turnover
    const turnover = (buy + sell) * qty;

    // Brokerage
    const brokerage = (buy * qty * rate) / 100 + (sell * qty * rate) / 100;

    // STT/CTT
    const sttCtt =
      tradeType === "intraday"
        ? (sell * qty * 0.025) / 100 // 0.025% of Sell Value for Intraday
        : ((buy + sell) * qty * 0.1) / 100; // 0.1% of Both Buy + Sell Value for Delivery

    // Transaction Charges (0.00325% of Turnover)
    const transactionCharges = (turnover * 0.00297) / 100;

    // Clearing Charges (Flat ₹0.01)
    const clearingCharges = 0.01;

    // GST (18% of Brokerage + Transaction Charges + Clearing Charges)
    const gst = ((brokerage + transactionCharges + clearingCharges) * 18) / 100;

    // Stamp Duty (0.003% of Buy Value)
    const stampDuty = (buy * qty * 0.002) / 100;

    // SEBI Turnover Fees (0.0001% of Turnover)
    const sebiFees = (turnover * 0.00015) / 100;

    // Total Taxes & Charges
    const totalCharges =
      brokerage +
      sttCtt +
      transactionCharges +
      clearingCharges +
      gst +
      stampDuty +
      sebiFees;

    // Net Values
    const netBuyValue = buy * qty;
    const netSellValue = sell * qty;

    // Net P&L
    const netPL = netSellValue - netBuyValue - totalCharges;

    return {
      turnover,
      brokerage,
      sttCtt,
      transactionCharges,
      clearingCharges,
      gst,
      stampDuty,
      sebiFees,
      totalCharges,
      netBuyValue,
      netSellValue,
      netPL,
    };
  };

  const result = calculateCharges();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Stock Brokerage Calculator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Inputs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Trade Type Tabs */}
              <div className="flex mb-6">
                <button
                  onClick={() => setTradeType("intraday")}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ${
                    tradeType === "intraday"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Intraday
                </button>
                <button
                  onClick={() => setTradeType("delivery")}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ${
                    tradeType === "delivery"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Delivery
                </button>
              </div>

              {/* Stock Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Stock
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="TATA CONSULTANCY SERVICES BSE"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                  <div className="absolute right-3 top-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buy Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sell Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brokerage Rate
                  </label>
                  <input
                    type="number"
                    value={brokerageRate}
                    onChange={(e) => setBrokerageRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.03"
                    step="0.01"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                Calculate Brokerage
              </button>
            </div>

            {/* Right Panel - Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Breakdown
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Turnover:</span>
                  <span className="font-medium">
                    ₹{result.turnover.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Brokerage:</span>
                  <span className="font-medium">
                    ₹{result.brokerage.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">STT/CTT:</span>
                  <span className="font-medium">
                    ₹{result.sttCtt.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Transaction Charges:</span>
                  <span className="font-medium">
                    ₹{result.transactionCharges.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Clearing Charges:</span>
                  <span className="font-medium">
                    ₹{result.clearingCharges.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">GST:</span>
                  <span className="font-medium">₹{result.gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">State Stamp Duty:</span>
                  <span className="font-medium">
                    ₹{result.stampDuty.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">SEBI Turnover Fees:</span>
                  <span className="font-medium">
                    ₹{result.sebiFees.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-t-2 border-gray-300 bg-gray-50 -mx-6 px-6">
                  <span className="font-semibold text-gray-800">
                    TOTAL TAXES & CHARGES:
                  </span>
                  <span className="font-bold text-gray-800">
                    ₹{result.totalCharges.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Net Buy Value:</span>
                  <span className="font-medium">
                    ₹{result.netBuyValue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Net Sell Value:</span>
                  <span className="font-medium">
                    ₹{result.netSellValue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-t-2 border-gray-300 bg-gray-50 -mx-6 px-6">
                  <span className="font-semibold text-gray-800">Net P&L:</span>
                  <span
                    className={`font-bold ${
                      result.netPL >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{result.netPL.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSection;
