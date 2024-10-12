import { createContext, useEffect, useReducer } from "react";
const initialState = {
  users: [],
  selectedUser: {},
  activities: [],
};
export const UserContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;  
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
        fetch(`${baseUrl}/users`, {
          method: "POST",
          body: JSON.stringify({ ...action.payload }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return { ...state, users: [...state.users, action.payload] };
      }
      case "ADD_ACTIVITIES": {
        fetch(`${baseUrl}/activities`, {
          method: "POST",
          body: JSON.stringify({ ...action.payload }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return {
          ...state,
          users: [...state.users],
          activities: [...state.activities, { ...action.payload }],
        };
      }

      case "DELETE_ACTIVITY": {
        try {
           fetch(
          `${baseUrl}/activities/${action.payload}`,
          {
            method: "DELETE",
          }
        )
        } catch (error) {
          throw new Error("error in removing activity")
        }
      
    
        const newActivities = state.activities.filter(
          (activity) => activity.id !== action.payload
        );
        return { ...state,users: [...state.users] , selectedUser: {...state.selectedUser},
        activities: [...newActivities] };
      }

      case "REMOVE": {
        fetch(`${baseUrl}/users/${action.payload.id}`, {
          method: "DELETE",
        })
         
        const newUsers = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        return { ...state, users: [...newUsers] , selectedUser: {...state.selectedUser},
        activities: [state.activities]};
      }
      case "UPDATE": {
        fetch(`${baseUrl}/users/${action.payload.id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...action.payload, id: action.payload.id }),
          headers: { "Content-Type": "application/json" },
        });
        const newUsers = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        newUsers.push(action.payload);
        return { ...state, users: [...newUsers] };
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
    }
  }
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
try {
   Promise.all([  
      fetch(`${baseUrl}/users`),  
      fetch(`${baseUrl}/activities`)  
    ]).then(responses => {  
      return Promise.all([  
        responses[0].json(),  
        responses[1].json()  
      ]);  
    }).then(data => {  
      dispatch({type:'FIRSTLOAD',payload:{users:[...data[0]],activities:[...data[1]]}})
    }) 
} catch (error) {
  throw new Error("error in fetching data")
}
   

  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
