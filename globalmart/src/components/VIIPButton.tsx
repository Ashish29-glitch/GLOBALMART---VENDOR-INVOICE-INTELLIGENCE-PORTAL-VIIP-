'use client';
import React, { useState } from 'react';

export function VIIPButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    invoiceId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the vendor portal
    window.location.href = 'http://localhost:8501/';
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Button */}
      <button
        className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          transform: isHovered ? 'scale(0.8)' : 'scale(1)',
          transition: 'all 0.3s ease',
        }}
      >
        VIIP
      </button>

      {/* Expanded Form */}
      {isHovered && (
        <div
          className="absolute bottom-0 right-0 w-96 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
          style={{
            animation: 'slideIn 0.3s ease',
          }}
        >
          <style>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Vendor Invoice Intelligence Portal
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Access your vendor invoices and analytics
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Name
              </label>
              <input
                type="text"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleInputChange}
                placeholder="Enter vendor name"
                className="w-full px-4 py-2 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice ID
              </label>
              <input
                type="text"
                name="invoiceId"
                value={formData.invoiceId}
                onChange={handleInputChange}
                placeholder="Enter invoice ID"
                className="w-full px-4 py-2 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Access Portal
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
