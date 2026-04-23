import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Habit {
  id: string;
  name: string;
  frequency: string;
  color: string;
  isCompleted: boolean;
  createdAt: number;
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id" | "isCompleted" | "createdAt">) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (newHabit: Omit<Habit, "id" | "isCompleted" | "createdAt">) => {
    const habit: Habit = {
      ...newHabit,
      id: Math.random().toString(36).substring(7),
      isCompleted: false,
      createdAt: Date.now(),
    };
    setHabits((prev) => [habit, ...prev]);
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isCompleted: !h.isCompleted } : h))
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
