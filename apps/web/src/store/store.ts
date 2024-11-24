// store/themeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false, // Initial mode is light
      toggleDarkMode: () =>
        set((state: { darkMode: any }) => ({ darkMode: !state.darkMode })),
    }),

    {
      name: "theme-storage", // Unique key for localStorage
    }
  )
);

export default useThemeStore;
