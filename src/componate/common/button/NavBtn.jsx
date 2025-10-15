import React from "react";

function NavBtn({ href = "#", label = "Click Me", className = "", onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-block px-5 py-2 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 ${className}`}
    >
      {label}
    </a>
  );
}

export default NavBtn;
