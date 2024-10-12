import { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { UserContext } from "../../../context/UserContext";
import AddActivities from "./AddActivities";
function RegisterForm() {
  const { state, dispatch } = useContext(UserContext);
  const [userFields, setUserFields] = useState({
    id: "",
    firstname: "",
    lastname: "",
    mellicode: "",
    activities: [],
  });
  const [toggleForm, setToggleForm] = useState('activity_form');



  function handelRegister(e) {
    e.preventDefault();
    window.activityChart.destroy();
    const { firstname, lastname, mellicode, activities } = userFields;
    if (!activities.length) {
      alert("select 1 activity least");
      return;
    }
    const isValid = firstname && lastname && mellicode;
    if (isValid) {
      dispatch({
        type: "ADD",
        payload: {
          ...userFields,
          activities: [...userFields.activities],
          id: uuidV4(),
        },
      });
    } else {
      alert("fill required fields");
      return;
    }
  }
  function handelChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserFields({ ...userFields, [name]: value });
  }
  function handelCheckbox(e) {
    const isInActivities = userFields.activities.findIndex(
      (activity) => activity === e.target.dataset.activity
    );
    if (isInActivities < 0)
      userFields.activities = [
        ...userFields.activities,
        e.target.dataset.activity,
      ];
    else userFields.activities.splice(isInActivities, 1);
    setUserFields({ ...userFields, activities: [...userFields.activities] });
  }

  return (
    <div className=" rounded-md max-h-[400px]">
      {
         state.activities.length && toggleForm==='register_form' ? <>
        <button  className="btn w-full  text-[#333] bg-[#f8d63e] rounded-md font-bold text-lg"  onClick={()=>{setToggleForm('activity_form')}}>ثبت فعالیت</button>
        <form className="h-[352px] p-2 flex flex-col justify-between">
          <div className="flex flex-col gap-2 w-full">
            <input
              className="input text-[#333]"
              type="text"
              name="firstname"
              placeholder="firstname"
              onChange={handelChange}
              value={userFields.firstname}
            />
            <input
              className="input text-[#333]"
              type="text"
              name="lastname"
              placeholder="lastname"
              onChange={handelChange}
              value={userFields.lastname}
            />
            <input
              className="input text-[#333]"
              type="text"
              name="mellicode"
              placeholder="melli code"
              onChange={handelChange}
              value={userFields.mellicode}
            />
          </div>

          <ul className="flex flex-col gap-2 mt-2 justify-start max-h-[200px] overflow-y-scroll ">
            {state.activities.map((activity) => {
              return (
                <li
                  className="p-2 flex justify-between items-center bg-white rounded-md text-[#333] text-right"
                  key={activity.id}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({
                        type: "DELETE_ACTIVITY",
                        payload: activity.id,
                      });
                    }}
                    className="btn btn-error font-sans font-bold text-gray-100"
                  >
                    حذف
                  </button>
                  <label
                    className="flex items-center justify-end gap-2"
                    htmlFor={`activity${activity.id}`}
                  >
                    <span>{activity.type}</span>
                    <input
                      className="checkbox confirm"
                      id={`activity${activity.id}`}
                      type="checkbox"
                      data-activity={activity.type}
                      onChange={handelCheckbox}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
          <button className="btn btn-warning" onClick={handelRegister}>
            ثبت
          </button>
        </form>
        </>:
         
         !state.activities.length && toggleForm==='register_form' && <AddActivities setToggleForm={setToggleForm}/>
       }
{
         toggleForm==='activity_form' && 
         <AddActivities setToggleForm={setToggleForm}/>
         
}
          
       
      
          
      
    </div>
  );
}

export default RegisterForm;
