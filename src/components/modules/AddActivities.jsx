import  { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { v4 as uuidV4 } from "uuid";

function AddActivities({setToggleForm}) {
    const {dispatch}=useContext(UserContext);
    const [activityFields,setActivityFields]=useState({
        id:'',
        type:''
    })


    function handleChange(e){
        const value=e.target.value;
        setActivityFields({...activityFields,type:value})
    }
    function addActivities(e){
        e.preventDefault();
        dispatch({type:'ADD_ACTIVITIES',payload:{...activityFields,id:uuidV4()}})
    }
  return (
    <div>
        <button className="btn w-full  text-[#333] bg-[#f8d63e] rounded-md font-bold text-lg" onClick={()=>{setToggleForm('register_form')}}>ثبت کاربر</button>
        <form>
            <div className='flex flex-col p-2 gap-2'>
                <input className='input' type='text' value={activityFields.type} onChange={handleChange} placeholder='activity'/>
                <button className='btn' onClick={addActivities}>+</button>
            </div>
        </form>
    </div>
  )
}

export default AddActivities