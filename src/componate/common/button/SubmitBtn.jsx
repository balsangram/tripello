import React from "react";

function SubmitBtn({ label = "Submit", className = "", onClick, disabled = false }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
}

export default SubmitBtn;
