import { configureStore } from "@reduxjs/toolkit";
import Posts from "../redusers/posts";
import Users from "../redusers/users";
const store = configureStore({
  reducer: { Posts, Users },
});
export default store;
