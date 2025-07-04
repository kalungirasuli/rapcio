import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
  id: string;
  familyName: string;
  firstName: string;
  languageOfTheName: string;
  dateOfBirth: string;
  gender: string;
  countryOfBirth: string;
  mainNationality: string;
  secondaryNationality: string;
  regionOrStateOfBirth: string;
  cityOfBirth: string;
  identificationNumber: string;
  status: string;
  clubId: string;
}

interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: JSON.parse(localStorage.getItem("players") || "[]"),
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
      localStorage.setItem("players", JSON.stringify(action.payload));
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
