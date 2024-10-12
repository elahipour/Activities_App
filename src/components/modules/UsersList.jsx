import { useContext, useEffect } from "react";
import EditUserModal from "./EditUserModal";
import { useState } from "react";
import { UserContext } from "../../../context/UserContext";
import SelectedActivities from "./SelectedActivities";
import selectedActivities from "../../helpers/selectedActivities";

function UsersList() {
  const { state, dispatch } = useContext(UserContext);
  const [activities, setActivities] = useState({});
  useEffect(() => {
    (async () => {
      setActivities(await selectedActivities());
    })();
  }, [state]);

  function handleSelectUser(e, user) {
    if (e.target.tagName !== "BUTTON") {
      dispatch({ type: "SELECT_USER", payload: user.activities });
    } else {
      dispatch({ type: "SELECT_USER", payload: [] });
    }
  }
  return (
    <>
      <div className="bg-white rounded-md max-h-[400px] w-full col-span-2 overflow-y-scroll p-2">
        {!state.users.length && (
          <div className="grid place-items-center h-full  font-bold text-sky-400 ">
            <span>no data..</span>
          </div>
        )}
        <ul className="flex flex-col gap-2">
          {state.users?.map((user) => {
            return (
              <li
                dir="rtl"
                className="[@media(max-width:500px)]:grid [@media(max-width:500px)]:grid-cols-2 text-center items-center flex gap-2 text-[#333] bg-[#f8d63e] p-3 rounded-md w-full justify-between"
                onClick={(e) => handleSelectUser(e, user)}
                name="handleSelect"
                key={user.id}
              >
                {/* <span>{user.id}</span> */}
                <span>{user.firstname}</span>
                <span>{user.lastname}</span>
                <span>{user.mellicode}</span>
                <div className="flex gap-4 bg-white rounded p-2 font-bold [@media(max-width:500px)]:grid [@media(max-width:500px)]:grid-cols-2">
                  <button
                    onClick={() =>
                      document.getElementById(`modal_${user.id}`).showModal()
                    }
                    className="text-orange-400"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "REMOVE", payload: user });
                    }}
                    className="text-red-500"
                  >
                    حذف
                  </button>
                  <EditUserModal user={user} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-3 overflow-y-scroll flex flex-col items-center justify-between md:flex-row-reverse p-4 h-fit bg-[#444]">
        <ul dir="rtl" className="flex gap-2 p-2 flex-wrap flex-1">
          {!state.selectedUser?.activities?.length && (
            <li>
              <span>no data..</span>
            </li>
          )}
          {state?.selectedUser?.activities?.map((userActivities, index) => {
            return (
              <li className={"bg-[#fff] text-[#333] rounded p-2"} key={index}>
                {userActivities}
              </li>
            );
          })}
        </ul>
        <SelectedActivities activities={activities} />
      </div>
    </>
  );
}

export default UsersList;
