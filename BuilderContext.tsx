import React, { createContext, useContext, useState } from "react";

interface Element {
  id: string;
  type: string;
  position: { x: number; y: number };
  sectionId: string;
}

interface BuilderContextType {
  elements: Element[];
  activeTemplate: { sections: { id: string; name: string }[] } | null;
  addElement: (type: string) => void;
  moveElement: (
    id: string,
    sectionId: string,
    position: { x: number; y: number }
  ) => void;
  selectElement: (id: string) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [activeTemplate] = useState({
    sections: [
      { id: "section-1", name: "Section 1" },
      { id: "section-2", name: "Section 2" },
    ],
  });

  const addElement = (type: string) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      position: { x: 0, y: 0 },
      sectionId: "",
    };
    setElements((prev) => [...prev, newElement]);
  };

  const moveElement = (
    id: string,
    sectionId: string,
    position: { x: number; y: number }
  ) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, sectionId, position } : el))
    );
  };

  const selectElement = (id: string) => {
    console.log("Selected Element ID:", id);
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        activeTemplate,
        addElement,
        moveElement,
        selectElement,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context)
    throw new Error("useBuilder must be used within a BuilderProvider");
  return context;
};
