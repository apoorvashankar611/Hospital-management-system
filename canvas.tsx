import React, { useState, useRef } from "react";
import { useBuilder } from "@/contexts/BuilderContext";
import BuilderElement from "./BuilderElement";

interface CanvasSectionProps {
  id: string;
  name: string;
}

const CanvasSection: React.FC<CanvasSectionProps> = ({ id, name }) => {
  const { elements, addElement, selectElement, moveElement } = useBuilder();
  const [isOver, setIsOver] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    const elementType = e.dataTransfer.getData("elementType");
    const elementId = e.dataTransfer.getData("elementId");

    if (!sectionRef.current) return;

    // Get section's position
    const rect = sectionRef.current.getBoundingClientRect();

    // Calculate position relative to the section
    // This places the element exactly where the mouse pointer is
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (elementType) {
      // Create new element
      addElement(elementType as any);

      // Get the newly added element (last element in the array)
      const newElement = elements[elements.length - 1];

      if (newElement) {
        // Move the element to the calculated position
        moveElement(newElement.id, id, position);

        // Select the new element
        selectElement(newElement.id);
      }
    } else if (elementId) {
      // Moving an existing element to the calculated position
      moveElement(elementId, id, position);
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`p-4 my-4 rounded-lg canvas-dropzone ${
        isOver
          ? "bg-blue-50 border-2 border-dashed border-blue-300"
          : "bg-builder-canvas"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="text-sm font-medium text-gray-500 mb-2">{name}</h3>
      <div className="min-h-[100px] relative">
        {elements.map((element) => (
          <BuilderElement key={element.id} element={element} canvasId={id} />
        ))}
      </div>
    </div>
  );
};

const Canvas: React.FC = () => {
  const { activeTemplate } = useBuilder();

  if (!activeTemplate) {
    return <div className="text-center p-8">No template selected</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Canvas</h2>
      <div className="max-w-3xl mx-auto border border-gray-200 rounded-lg p-4">
        {activeTemplate.sections.map((section) => (
          <CanvasSection key={section.id} id={section.id} name={section.name} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
