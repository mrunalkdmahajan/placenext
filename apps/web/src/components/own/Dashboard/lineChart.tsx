// components/LineChart.tsx
"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the data labels plugin
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels // Register the data labels plugin
);

const LineChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("Engineering");

  useEffect(() => {
    // Dummy data for maximum salary for each year from 2015 to 2023
    const departmentData: Record<string, number[]> = {
      Engineering: [35000, 55000, 43000, 65000, 60000, 30000, 80000, 85000, 90000],
      Marketing: [30000, 45000, 50000, 55000, 58000, 60000, 62000, 70000, 75000],
      Finance: [40000, 50000, 55000, 60000, 65000, 68000, 72000, 75000, 80000],
    };

    const chartData = {
      labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"], // Years on x-axis
      datasets: [
        {
          label: "Max Salary",
          data: departmentData[selectedDepartment], // Use selected department's data
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Background color for the line
          borderColor: "rgba(75, 192, 192, 1)", // Border color for the line
          borderWidth: 2,
          fill: false, // Do not fill the area under the line
          pointRadius: 5, // Size of points
        },
      ],
    };

    setData(chartData);
  }, [selectedDepartment]);

  if (!data) {
    return <div>Loading...</div>; // Loading state
  }

  // Line chart options
  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw as number;
            return `Max Salary: ${value}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        formatter: (value: number) => {
          return `${value}`; // Display salary value
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: false, // Show all year labels
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4 md:px-10 lg:px-8">
      <h1 className="text-lg font-bold mb-6">Maximum Salary from 2015 to 2023</h1>
      <div className="mb-4">
        <Select value={selectedDepartment} onValueChange={(value) => setSelectedDepartment(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-8 lg:w-400">
        <Line style={{ width: 400 }} data={data} options={lineOptions} />
      </div>
    </div>
  );
};

export default LineChart;
