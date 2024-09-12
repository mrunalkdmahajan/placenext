"use client";

import { useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([
    {
      rollNo: 1,
      name: "John Doe",
      branch: "CSE",
      year: "3rd",
      cgpa: 8.5,
      placed: "Yes",
    },
    {
      rollNo: 2,
      name: "Jane Doe",
      branch: "ECE",
      year: "4th",
      cgpa: 9.0,
      placed: "No",
    },
    {
      rollNo: 3,
      name: "Alice",
      branch: "CSE",
      year: "3rd",
      cgpa: 8.0,
      placed: "Yes",
    },
    {
      rollNo: 4,
      name: "Bob",
      branch: "ECE",
      year: "4th",
      cgpa: 8.5,
      placed: "No",
    },
    {
      rollNo: 5,
      name: "Charlie",
      branch: "CSE",
      year: "3rd",
      cgpa: 9.0,
      placed: "Yes",
    },
    {
      rollNo: 6,
      name: "David",
      branch: "ECE",
      year: "4th",
      cgpa: 8.0,
      placed: "No",
    },
  ]);

  return (
    <div className="flex flex-col py-4 px-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Student List</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="filterDate" className="block font-medium mb-1">
              Date
            </label>
            <select
              id="filterDate"
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Date</option>
            </select>
          </div>
          <div>
            <label htmlFor="orderType" className="block font-medium mb-1">
              Order Type
            </label>
            <select
              id="orderType"
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Type</option>
            </select>
          </div>
          <div>
            <label htmlFor="orderStatus" className="block font-medium mb-1">
              Order Status
            </label>
            <select
              id="orderStatus"
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Status</option>
            </select>
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
            Reset Filter
          </button>
        </div>
      </div>
      <div>
        <table className="table-auto w-full text-left border border-gray-200">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="px-4 py-2 border">Roll No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Branch</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">CGPA</th>
              <th className="px-4 py-2 border">Placed</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNo} className="text-center">
                <td className="px-4 py-2 border">{student.rollNo}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.branch}</td>
                <td className="px-4 py-2 border">{student.year}</td>
                <td className="px-4 py-2 border">{student.cgpa}</td>
                <td
                  className={`px-4 py-2 border ${
                    student.placed === "Yes" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {student.placed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
