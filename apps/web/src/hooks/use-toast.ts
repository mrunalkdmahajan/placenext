// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";



// type ToastType = {
//   id: string;
//   title: string;
//   description?: string;
//   variant?: "default" | "destructive";
// };

// type ToastContextType = {
//   toasts: ToastType[];
//   toast: (props: Omit<ToastType, "id">) => void;
//   dismiss: (id: string) => void;
// };

// export const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function ToastProvider({ children }: { children: React.ReactNode }): JSX.Element {
//   const [toasts, setToasts] = useState<ToastType[]>([]);

//   const toast = ({ title, description, variant = "default" }: Omit<ToastType, "id">) => {
//     const id = Math.random().toString(36).substring(2, 9);
//     setToasts((prev) => [...prev, { id, title, description, variant }]);
    
//     // Auto dismiss after 5 seconds
//     setTimeout(() => {
//       dismiss(id);
//     }, 5000);
//   };

//   const dismiss = (id: string) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   return (
//     <ToastContext.Provider value={{ toasts, toast, dismiss }}>
//       {children}
//     </ToastContext.Provider>
//   );
// }

// export function useToast() {
//   const context = useContext(ToastContext);
//   if (context === undefined) {
//     throw new Error("useToast must be used within a ToastProvider");
//   }
//   return context;
// }
