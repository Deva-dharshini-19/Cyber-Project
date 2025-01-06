import React from "react";

const DashboardCards = ({ attack }) => {
  console.log(attack)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {attack.map((item, index) => (
        <div
          key={index}
          className="bg-gray-50 text-gray-700 p-6 rounded-lg shadow-sm flex flex-col items-start justify-center space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.icon}</span>
            <h2 className="text-sm font-medium">{item.title}</h2>
          </div>
          <p className="text-3xl font-semibold">{item.value}</p>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
