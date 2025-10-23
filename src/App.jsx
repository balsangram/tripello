import React from "react";
import AppRouter from "./router/router";
import "./App.css";
import TestCookies from "./TestCookies ";
import { AuthProvider } from "./layouts/AuthContext"; // 👈 Import AuthProvider

export default function App() {
  return (
    <AuthProvider>
      <TestCookies />
      <AppRouter />
    </AuthProvider>
  );
}
