import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Club {
  id: string;
  clubName: string;
  email: string;
  description: string;
}

interface ClubState {
  clubs: Club[];
}

const initialState: ClubState = {
  clubs: JSON.parse(localStorage.getItem("clubs") || "[]"),
};

const clubSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    setClubs: (state, action: PayloadAction<Club[]>) => {
      state.clubs = action.payload;
      localStorage.setItem("clubs", JSON.stringify(action.payload));
    },
  },
});

export const { setClubs } = clubSlice.actions;
export default clubSlice.reducer;
