import React from "react";

interface BuilderElementProps {
  element: {
    id: string;
    type: string;
    position: { x: number; y: number };
    sectionId: string;
  };
  canvasId: string;
}

const BuilderElement: React.FC<BuilderElementProps> = ({
  element,
  canvasId,
}) => {
  if (element.sectionId !== canvasId) return null;

  return (
    <div
      className="absolute bg-blue-200 p-2 rounded shadow"
      style={{ left: element.position.x, top: element.position.y }}
    >
      {element.type}
    </div>
  );
};

export default BuilderElement;
