import React from "react";
import Canvas from "./Canvas";
import { BuilderProvider } from "./BuilderContext";


function App() {
  return (
    <BuilderProvider>
      <div className="h-screen p-4 bg-gray-50">
        <Canvas />
      </div>
    </BuilderProvider>
  );
}

export default App;
