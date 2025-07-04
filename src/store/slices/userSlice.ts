import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
