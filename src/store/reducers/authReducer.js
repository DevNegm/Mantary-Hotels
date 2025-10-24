import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const savedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  users: savedUsers,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, email, password } = action.payload;

      const exists = state.users.some((u) => u.email === email);
      if (exists) {
        toast.error('User already exists')
        return;
      }

      const newUser = { username, email, password, id: Math.random().toString(36).substr(2, 9) };
      state.users.push(newUser);
      state.user = newUser;
      state.isAuthenticated = true;

      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const existingUser = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (existingUser) {
        state.user = existingUser;
        state.isAuthenticated = true;
        localStorage.setItem("currentUser", JSON.stringify(existingUser));
      } else {
        toast.error('Invalid credentials')
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { registerUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
