import { Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto pb-24">
      <h1 className="text-3xl font-bold mb-4 text-emerald-700">AgriData – Post‑Harvest Agricultural Data Tracking System</h1>
      <p className="mb-2 text-gray-800">
        <strong>Organization:</strong> Addis Ababa Institute of Technology, Department of Software Engineering
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Date:</strong> March 28, 2026
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Version:</strong> 1.0
      </p>
      <p className="mt-4 text-gray-600">
        This MVP allows agricultural vendors to register, log in, record post‑harvest batch data, capture GPS locations, upload images, and view statistics. Administrators can view all batches, monitor dashboard statistics, and export CSV reports.
      </p>
      {/* Team Section */}
      <section id="team" className="mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-emerald-600">Team</h2>
        <ul className="list-disc list-inside text-gray-700">
          <div className="flex justify-between w-72">
            <span>Aron Teklu</span>
            <span>ATE/6219/16</span>
          </div>
          <div className="flex justify-between w-72">
            <span>Dagim Fisha</span>
            <span>ATE/9424/16</span>
          </div>
          <div className="flex justify-between w-72">
            <span>Mikias Kebede</span>
            <span>ATE/9168/16</span>
          </div>
          <div className="flex justify-between w-72">
            <span>Robera Mulugeta</span>
            <span>ATE/9026/16</span>
          </div>
          <div className="flex justify-between w-72">
            <span>Yonatan Tadese</span>
            <span>ATE/6709/16</span>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default About;
