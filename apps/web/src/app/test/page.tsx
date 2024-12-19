"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DepartmentPlacementChart = ({ chartData }: any) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Department-Wise Placement Status",
      },
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true, // Stack the bars on the x-axis
      },
      y: {
        stacked: true, // Stack the bars on the y-axis
        title: {
          display: true,
          text: "Number of Students",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default function TestPage() {
  const data = {
    labels: ["CSE", "ECE", "Mechanical", "Civil", "IT"], // Department names
    datasets: [
      {
        label: "Placed",
        data: [120, 100, 80, 60, 90], // Students placed per department
        backgroundColor: "rgba(75, 192, 192, 0.7)", // Bar color for "Placed"
      },
      {
        label: "Not Placed",
        data: [30, 40, 50, 70, 40], // Students not placed
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Bar color for "Not Placed"
      },
    ],
  };
  return (
    <div>
      <DepartmentPlacementChart chartData={data} />
    </div>
  );
}
