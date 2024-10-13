import { createContext, useEffect, useReducer } from "react";
import checkUserInList from "../src/helpers/checkUserInList";

const initialState = {
  users: [],
  selectedUser: {},
  activities: [],
};

export const UserContext = createContext();

function UserContextProvider({ children }) {
  function userReducer(state, action) {
    switch (action.type) {
      case "FIRSTLOAD": {
        return {
          ...state,
          selectedUser: {},
          users: [...action.payload.users],
          activities: [...action.payload.activities],
        };
      }
      case "ADD": {
        const isInList=checkUserInList(action.payload.mellicode);
        if(isInList){
          alert(`یک کاربر با کد ملی "${action.payload.mellicode}" قبلاً ثبت شده است.`);  
        return state;

        }
        const updatedUsers = [...state.users, action.payload];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { ...state, users: updatedUsers };
      }
      case "ADD_ACTIVITIES": {
        const updatedActivities = [...state.activities, action.payload];
        localStorage.setItem("activities", JSON.stringify(updatedActivities));
        return {
          ...state,
          activities: updatedActivities,
        };
      }

      case "DELETE_ACTIVITY": {
        const newActivities = state.activities.filter(
          (activity) => activity.id !== action.payload
        );
        localStorage.setItem("activities", JSON.stringify(newActivities));
        return { ...state, activities: newActivities };
      }

      case "REMOVE": {
        const newUsers = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        localStorage.setItem("users", JSON.stringify(newUsers));
        return { ...state, users: newUsers };
      }
      case "UPDATE": {
        const newUsers = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        localStorage.setItem("users", JSON.stringify(newUsers));
        return { ...state, users: newUsers };
      }
      case "SELECT_USER": {
        return {
          ...state,
          selectedUser: {
            ...state.selectedUser,
            activities: [...action.payload],
          },
        };
      }
      default: {
        return state;
      }
    }
  }

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    dispatch({ type: "FIRSTLOAD", payload: { users, activities } });
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
