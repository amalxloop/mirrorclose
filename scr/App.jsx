import React from "react";
import Hero from "./components/Hero";
import CloserForm from "./components/CloserForm";

export default function App() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <Hero />
      <CloserForm />
    </div>
  );
}
