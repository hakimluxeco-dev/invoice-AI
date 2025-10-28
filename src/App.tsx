import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import InvoiceUpload from "./components/invoice/InvoiceUpload";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-slate-950 text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<InvoiceUpload />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;