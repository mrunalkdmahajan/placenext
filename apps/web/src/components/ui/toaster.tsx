// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { X } from "lucide-react";

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

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function ToastProvider({ children }: { children: React.ReactNode }) {
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

// export function Toaster() {
//   const { toasts, dismiss } = useToast();

//   return (
//     <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
//       {toasts.map((toast) => (
//         <div
//           key={toast.id}
//           className={`
//             p-4 rounded-lg shadow-lg flex justify-between items-start
//             transform transition-all duration-300 ease-in-out
//             ${toast.variant === "destructive" ? "bg-red-600 text-white" : "bg-white text-gray-800 border"}
//           `}
//         >
//           <div>
//             <h3 className="font-medium">{toast.title}</h3>
//             {toast.description && (
//               <p className="text-sm mt-1">{toast.description}</p>
//             )}
//           </div>
//           <button onClick={() => dismiss(toast.id)} className="ml-4">
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }