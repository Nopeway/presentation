import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const VPSCostComparison = () => {
  const [viewMode, setViewMode] = useState("table");
  const [compareMode, setCompareMode] = useState("firstYear");

  const data = [
    {
      category: "Infrastructure (CAPEX)",
      type: "VPS Server",
      description: "Linux Ubuntu 8 Core, 16 GB RAM, 200 SSD",
      biznet: { firstMonth: 1219000, yearly: 14628000 },
      cloudmatika: { firstMonth: 1700000, yearly: 20400000 },
    },
    {
      category: "Infrastructure (OPEX)",
      type: "Web Application Firewall",
      description: "WAF Security Service",
      biznet: { firstMonth: 350000, yearly: 4200000 },
      cloudmatika: { firstMonth: 650000, yearly: 7800000 },
    },
    {
      category: "Infrastructure (OPEX)",
      type: "Domain Registration",
      description: "Annual Domain Fee",
      biznet: { firstMonth: 210000, yearly: 210000 },
      cloudmatika: { firstMonth: 210000, yearly: 210000 },
    },
    {
      category: "Infrastructure (OPEX)",
      type: "SSL Certificate",
      description: "Annual SSL Certificate",
      biznet: { firstMonth: 220000, yearly: 220000 },
      cloudmatika: { firstMonth: 2200000, yearly: 2200000 },
    },
    {
      category: "Professional Services (OPEX)",
      type: "Implementation",
      description: "Migration & Initial Setup",
      biznet: { firstMonth: 2500000, yearly: 0 },
      cloudmatika: { firstMonth: 7000000, yearly: 0 },
    },
  ];

  const totals = {
    biznet: { firstMonth: 4499000, yearly: 19258000 },
    cloudmatika: { firstMonth: 11760000, yearly: 30610000 },
  };

  const currentProvider = totals.cloudmatika;
  const savings = {
    biznet: {
      firstYear: currentProvider.firstMonth - totals.biznet.firstMonth,
      yearly: currentProvider.yearly - totals.biznet.yearly,
      firstYearPercent:
        ((currentProvider.firstMonth - totals.biznet.firstMonth) /
          currentProvider.firstMonth) *
        100,
      yearlyPercent:
        ((currentProvider.yearly - totals.biznet.yearly) /
          currentProvider.yearly) *
        100,
    },
  };

  const chartData = [
    {
      name: "Biznet GIO",
      "Initial Month": totals.biznet.firstMonth,
      "Annual Recurring": totals.biznet.yearly,
    },
    {
      name: "Cloudmatika",
      "Initial Month": totals.cloudmatika.firstMonth,
      "Annual Recurring": totals.cloudmatika.yearly,
    },
  ];

  const yearlyProjection = [
    {
      year: "Year 1",
      Biznet: totals.biznet.firstMonth,
      Cloudmatika: totals.cloudmatika.firstMonth,
    },
    {
      year: "Year 2",
      Biznet: totals.biznet.yearly,
      Cloudmatika: totals.cloudmatika.yearly,
    },
    {
      year: "Year 3",
      Biznet: totals.biznet.yearly,
      Cloudmatika: totals.cloudmatika.yearly,
    },
    {
      year: "Year 4",
      Biznet: totals.biznet.yearly,
      Cloudmatika: totals.cloudmatika.yearly,
    },
    {
      year: "Year 5",
      Biznet: totals.biznet.yearly,
      Cloudmatika: totals.cloudmatika.yearly,
    },
  ];

  const calculate5YearTCO = (provider) => {
    const firstYear = totals[provider].firstMonth;
    const annualCost = totals[provider].yearly;
    return firstYear + annualCost * 4;
  };

  const formatCurrency = (value) => {
    if (value === "-" || value === 0) return "-";
    return `Rp${value.toLocaleString("id-ID")}`;
  };

  const formatPercent = (value) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-t-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Cloud Infrastructure Cost Analysis
          </h1>
          <p className="text-blue-100 text-sm mb-4">
            Biznet GIO vs Cloudmatika - Odoo ERP Deployment Cost Comparison
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setViewMode("table")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                viewMode === "table"
                  ? "bg-white text-blue-900 shadow-lg"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              📊 Detailed Table
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                viewMode === "chart"
                  ? "bg-white text-blue-900 shadow-lg"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              📈 Visual Comparison
            </button>
            <button
              onClick={() => setViewMode("savings")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                viewMode === "savings"
                  ? "bg-white text-blue-900 shadow-lg"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              💰 Cost Savings Analysis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-4 mb-6 px-4">
          <div className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-green-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  💡 Recommended: Biznet GIO
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {formatCurrency(savings.biznet.firstYear)}
                </p>
                <p className="text-sm font-semibold text-green-700 mt-2">
                  Potential Savings vs Current Provider
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-600">
                    Initial Month:{" "}
                    <span className="font-bold text-green-700">
                      {formatPercent(savings.biznet.firstYearPercent)}
                    </span>{" "}
                    savings
                  </p>
                  <p className="text-xs text-gray-600">
                    Annual Recurring:{" "}
                    <span className="font-bold text-green-700">
                      {formatPercent(savings.biznet.yearlyPercent)}
                    </span>{" "}
                    savings
                  </p>
                </div>
              </div>
              <div className="text-5xl">💚</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-blue-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  📍 Current Provider: Cloudmatika
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {formatCurrency(totals.cloudmatika.firstMonth)}
                </p>
                <p className="text-sm font-semibold text-blue-700 mt-2">
                  Initial Setup Cost (Month 1)
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-600">
                    Annual Recurring:{" "}
                    <span className="font-bold text-blue-700">
                      {formatCurrency(totals.cloudmatika.yearly)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600">
                    Baseline for comparison
                  </p>
                </div>
              </div>
              <div className="text-5xl">📍</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden">
          {viewMode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th
                      className="px-4 py-3 text-left text-sm font-semibold"
                      rowSpan="2"
                    >
                      Cost Category
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-semibold"
                      rowSpan="2"
                    >
                      Item Type
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-semibold"
                      rowSpan="2"
                    >
                      Description
                    </th>
                    <th
                      className="px-4 py-3 text-center text-sm font-semibold bg-green-700"
                      colSpan="2"
                    >
                      Biznet GIO (Recommended)
                    </th>
                    <th
                      className="px-4 py-3 text-center text-sm font-semibold bg-blue-700"
                      colSpan="2"
                    >
                      Cloudmatika (Current Provider)
                    </th>
                  </tr>
                  <tr className="bg-gray-700 text-white text-xs">
                    <th className="px-4 py-2 text-center bg-green-600">
                      Initial Cost
                      <br />
                      (Month 1)
                    </th>
                    <th className="px-4 py-2 text-center bg-green-600">
                      Annual
                      <br />
                      Recurring
                    </th>
                    <th className="px-4 py-2 text-center bg-blue-600">
                      Initial Cost
                      <br />
                      (Month 1)
                    </th>
                    <th className="px-4 py-2 text-center bg-blue-600">
                      Annual
                      <br />
                      Recurring
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">
                        {row.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">
                        {formatCurrency(row.biznet.firstMonth)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">
                        {formatCurrency(row.biznet.yearly)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-blue-900 font-semibold bg-blue-50">
                        {formatCurrency(row.cloudmatika.firstMonth)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-blue-900 font-semibold bg-blue-50">
                        {formatCurrency(row.cloudmatika.yearly)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-900 text-white font-bold">
                    <td colSpan="3" className="px-4 py-4 text-base">
                      TOTAL COST
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      {formatCurrency(totals.biznet.firstMonth)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      {formatCurrency(totals.biznet.yearly)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right bg-blue-800">
                      {formatCurrency(totals.cloudmatika.firstMonth)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right bg-blue-800">
                      {formatCurrency(totals.cloudmatika.yearly)}
                    </td>
                  </tr>
                  <tr className="bg-green-600 text-white font-bold">
                    <td colSpan="3" className="px-4 py-4 text-base">
                      💰 POTENTIAL SAVINGS
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      {formatCurrency(savings.biznet.firstYear)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      {formatCurrency(savings.biznet.yearly)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right" colSpan="2">
                      {formatPercent(savings.biznet.firstYearPercent)} (Month 1)
                      | {formatPercent(savings.biznet.yearlyPercent)} (Annual)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {viewMode === "chart" && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Cost Comparison: Biznet GIO vs Cloudmatika
                </h3>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setCompareMode("firstYear")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      compareMode === "firstYear"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Initial Month Costs
                  </button>
                  <button
                    onClick={() => setCompareMode("annual")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      compareMode === "annual"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Annual Recurring Costs
                  </button>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      `Rp${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                    }}
                  />
                  <Legend />
                  {compareMode === "firstYear" ? (
                    <Bar
                      dataKey="Initial Month"
                      fill="#2563eb"
                      radius={[8, 8, 0, 0]}
                    />
                  ) : (
                    <Bar
                      dataKey="Annual Recurring"
                      fill="#16a34a"
                      radius={[8, 8, 0, 0]}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300 shadow-md">
                  <h4 className="font-semibold text-blue-900 mb-3 text-base">
                    📍 Current Provider: Cloudmatika
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Initial Month:
                      </span>
                      <span className="font-bold text-blue-900 text-base">
                        {formatCurrency(totals.cloudmatika.firstMonth)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Annual Recurring:
                      </span>
                      <span className="font-bold text-blue-900 text-base">
                        {formatCurrency(totals.cloudmatika.yearly)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300 shadow-md">
                  <h4 className="font-semibold text-green-900 mb-3 text-base">
                    💡 Recommended: Biznet GIO
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Initial Month:
                      </span>
                      <span className="font-bold text-green-900 text-base">
                        {formatCurrency(totals.biznet.firstMonth)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Annual Recurring:
                      </span>
                      <span className="font-bold text-green-900 text-base">
                        {formatCurrency(totals.biznet.yearly)}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-green-300">
                      <p className="text-xs font-bold text-green-700">
                        💰 Savings: {formatCurrency(savings.biznet.firstYear)}{" "}
                        (Month 1)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === "savings" && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Cost Savings Analysis: Biznet GIO vs Cloudmatika
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-center">
                    Cost Comparison
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Cloudmatika",
                            value: totals.cloudmatika.firstMonth,
                            fill: "#2563eb",
                          },
                          {
                            name: "Biznet GIO",
                            value: totals.biznet.firstMonth,
                            fill: "#16a34a",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) =>
                          `${name}: ${formatCurrency(value)}`
                        }
                        outerRadius={100}
                        dataKey="value"
                      />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Savings Breakdown
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h5 className="font-semibold text-blue-900">
                        📍 Cloudmatika (Current)
                      </h5>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Initial Month:</span>
                          <span className="font-bold">
                            {formatCurrency(totals.cloudmatika.firstMonth)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual OPEX:</span>
                          <span className="font-bold">
                            {formatCurrency(totals.cloudmatika.yearly)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h5 className="font-semibold text-green-900">
                        ✅ Biznet GIO (Recommended)
                      </h5>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Initial Month:</span>
                          <span className="font-bold">
                            {formatCurrency(totals.biznet.firstMonth)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual OPEX:</span>
                          <span className="font-bold">
                            {formatCurrency(totals.biznet.yearly)}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-green-300">
                          <div className="flex justify-between">
                            <span className="font-semibold text-green-700">
                              💰 Savings:
                            </span>
                            <span className="font-bold text-green-700">
                              {formatCurrency(savings.biznet.firstYear)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-300 shadow-lg">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">
                  💼 Cost Benefit Analysis
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-bold text-green-800 mb-3">
                      💰 Immediate Benefits
                    </h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between pb-2 border-b">
                        <span>Initial Month Savings:</span>
                        <span className="font-bold text-green-700">
                          {formatCurrency(savings.biznet.firstYear)}
                        </span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span>Cost Reduction:</span>
                        <span className="font-bold text-green-700">
                          {formatPercent(savings.biznet.firstYearPercent)}
                        </span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span>Annual Savings:</span>
                        <span className="font-bold text-green-700">
                          {formatCurrency(savings.biznet.yearly)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Yearly Reduction:</span>
                        <span className="font-bold text-green-700">
                          {formatPercent(savings.biznet.yearlyPercent)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-bold text-blue-800 mb-3">
                      📊 Long-term Impact
                    </h5>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="text-xs text-gray-600 mb-1">
                          3-Year Savings
                        </p>
                        <p className="text-xl font-bold text-green-700">
                          {formatCurrency(
                            savings.biznet.firstYear + savings.biznet.yearly * 2
                          )}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-xs text-gray-600 mb-1">
                          5-Year Savings
                        </p>
                        <p className="text-xl font-bold text-blue-700">
                          {formatCurrency(
                            savings.biznet.firstYear + savings.biznet.yearly * 4
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-300">
                  <h5 className="font-bold text-amber-900 mb-2">
                    🎯 Executive Recommendation
                  </h5>
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-700">
                      Migrate to Biznet GIO
                    </strong>{" "}
                    for {formatPercent(savings.biznet.firstYearPercent)} initial
                    cost reduction and{" "}
                    {formatPercent(savings.biznet.yearlyPercent)} ongoing
                    operational savings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {viewMode === "projection" && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                5-Year TCO: Biznet GIO vs Cloudmatika
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-center">
                    Annual Cost Projection
                  </h4>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={yearlyProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis
                        tickFormatter={(value) =>
                          `${(value / 1000000).toFixed(0)}M`
                        }
                      />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar
                        dataKey="Biznet"
                        fill="#16a34a"
                        radius={[4, 4, 0, 0]}
                        name="Biznet GIO"
                      />
                      <Bar
                        dataKey="Cloudmatika"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                        name="Cloudmatika"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-center">
                    5-Year Total Comparison
                  </h4>
                  <div className="space-y-4 mt-8">
                    <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-300">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold text-blue-900">Cloudmatika</h5>
                        <span className="text-2xl">📍</span>
                      </div>
                      <p className="text-3xl font-bold text-blue-700">
                        {formatCurrency(calculate5YearTCO("cloudmatika"))}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        5-Year Total Cost
                      </p>
                    </div>

                    <div className="bg-green-50 p-5 rounded-xl border-2 border-green-300">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold text-green-900">Biznet GIO</h5>
                        <span className="text-2xl">✅</span>
                      </div>
                      <p className="text-3xl font-bold text-green-700">
                        {formatCurrency(calculate5YearTCO("biznet"))}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        5-Year Total Cost
                      </p>
                      <div className="mt-3 pt-3 border-t border-green-300">
                        <p className="text-lg font-bold text-green-700">
                          💰 -
                          {formatCurrency(
                            calculate5YearTCO("cloudmatika") -
                              calculate5YearTCO("biznet")
                          )}
                        </p>
                        <p className="text-xs text-green-600">
                          {formatPercent(
                            ((calculate5YearTCO("cloudmatika") -
                              calculate5YearTCO("biznet")) /
                              calculate5YearTCO("cloudmatika")) *
                              100
                          )}{" "}
                          total savings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">
                  💼 Strategic Analysis
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-bold text-green-800 mb-2">
                      ✅ Best Value: Biznet GIO
                    </h5>
                    <ul className="space-y-2 text-xs">
                      <li>
                        • <strong>5-Year Total Savings:</strong>{" "}
                        {formatCurrency(
                          calculate5YearTCO("cloudmatika") -
                            calculate5YearTCO("biznet")
                        )}
                      </li>
                      <li>
                        • <strong>Total Cost Reduction:</strong>{" "}
                        {formatPercent(
                          ((calculate5YearTCO("cloudmatika") -
                            calculate5YearTCO("biznet")) /
                            calculate5YearTCO("cloudmatika")) *
                            100
                        )}{" "}
                        vs current
                      </li>
                      <li>
                        • <strong>Initial Month Savings:</strong>{" "}
                        {formatCurrency(savings.biznet.firstYear)} (
                        {formatPercent(savings.biznet.firstYearPercent)})
                      </li>
                      <li>
                        • <strong>Annual OPEX Reduction:</strong>{" "}
                        {formatCurrency(
                          totals.cloudmatika.yearly - totals.biznet.yearly
                        )}
                        /year
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-bold text-blue-800 mb-2">
                      📊 Financial Summary
                    </h5>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="text-xs text-gray-600 mb-1">
                          Immediate Savings (Month 1)
                        </p>
                        <p className="text-xl font-bold text-green-700">
                          {formatCurrency(savings.biznet.firstYear)}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {formatPercent(savings.biznet.firstYearPercent)} lower
                          initial cost
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-xs text-gray-600 mb-1">
                          Recurring Annual Savings
                        </p>
                        <p className="text-xl font-bold text-blue-700">
                          {formatCurrency(savings.biznet.yearly)}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {formatPercent(savings.biznet.yearlyPercent)} OPEX
                          reduction
                        </p>
                      </div>
                      <div className="bg-amber-50 p-3 rounded border border-amber-300">
                        <p className="text-xs font-bold text-amber-900">
                          🎯 Recommendation
                        </p>
                        <p className="text-xs text-gray-700 mt-1">
                          Migrate to Biznet GIO for maximum cost optimization
                          over 5 years.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-5 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">
              📋 Notes & Assumptions:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <strong>CAPEX</strong>: Capital Expenditure - Initial
                  infrastructure investment
                </li>
                <li>
                  <strong>OPEX</strong>: Operating Expenditure - Recurring
                  operational costs
                </li>
                <li>
                  <strong>Initial Month</strong>: One-time setup including
                  implementation and migration
                </li>
                <li>
                  <strong>Annual Recurring</strong>: Ongoing operational costs
                  from Year 2 onwards
                </li>
              </ul>
              <ul className="space-y-1 list-disc list-inside">
                <li>All prices in Indonesian Rupiah (IDR)</li>
                <li>
                  <strong className="text-blue-700">Cloudmatika</strong> is the
                  current active provider
                </li>
                <li>Savings calculations based on direct comparison</li>
                <li>
                  5-Year TCO includes initial setup (Year 1) + 4 years recurring
                  costs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPSCostComparison;
