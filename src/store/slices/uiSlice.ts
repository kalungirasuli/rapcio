import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  theme: "light" | "dark";
  isSidebarOpen: boolean;
  activeSidebarLink: string | null;
  isLoading: boolean;
  isMobileDevice: boolean; // New state for mobile device detection
}

const initialState: UIState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "dark",
  isSidebarOpen: window.innerWidth >= 768, // Sidebar open only for devices wider than 768px
  activeSidebarLink: null,
  isLoading: false,
  isMobileDevice: window.innerWidth < 768, // Detect if the device is a mobile device
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarState(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setActiveSidebarLink(state, action: PayloadAction<string | null>) {
      state.activeSidebarLink = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setDeviceWidth(state, action: PayloadAction<number>) {
      const deviceWidth = action.payload;
      state.isMobileDevice = deviceWidth < 768;
      state.isSidebarOpen = deviceWidth >= 768;
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  setSidebarState,
  setActiveSidebarLink,
  setIsLoading,
  setDeviceWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
