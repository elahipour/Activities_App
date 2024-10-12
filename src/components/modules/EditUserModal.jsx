import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

function EditUserModal({user}) {
    const {dispatch}=useContext(UserContext)
    const [EditFormFields,setEditFormFields]=useState({...user})
    function handleChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setEditFormFields({...EditFormFields,[name]:value})
    }
  return (
    <dialog id={`modal_${user.id}`} className="modal modal-bottom md:modal-middle">
      <div className="modal-box  text-[#ffffff] text-right p-2 bg-[#333] rounded-none">
        <div className="flex text-[#fcc] items-center justify-between px-4">
          <h3 className="font-bold text-lg text-[16px]">فرم ویرایش</h3>
          <p className="py-4">ESC=بستن</p>
        </div>
        <div className="modal-action flex justify-center pb-4">
          <form method="dialog">
            <div className="flex flex-col gap-2 justify-end">
              <div className="flex flex-col md:flex-row w-[300px] md:w-auto gap-2">
                <input name="firstname" placeholder="نام" type="text" className="p-2 input bg-[#f8d63e] focus:bg-[#e2e2e2] text-[#555] focus:text-[#222] [@media(max-width:380px)]:w-[250px] [@media(max-width:380px)]:mx-auto" value={EditFormFields.firstname} onChange={handleChange}/>
                <input name="lastname" placeholder="نام خانوادگی" type="text" className="p-2 input bg-[#f8d63e] focus:bg-[#e2e2e2] text-[#555] focus:text-[#222] [@media(max-width:380px)]:w-[250px] [@media(max-width:380px)]:mx-auto" value={EditFormFields.lastname} onChange={handleChange}/>
               </div>
                <input name="mellicode" placeholder="کد ملـــی" type="text" className="p-2 input bg-[#f8d63e] focus:bg-[#e2e2e2] text-[#555] focus:text-[#222] [@media(max-width:380px)]:w-[250px] [@media(max-width:380px)]:mx-auto" value={EditFormFields.mellicode} onChange={handleChange}/>
              <button className="bg-white text-warning font-bold text-[18px] btn btn-warning btn-outline  [@media(max-width:380px)]:mx-auto  [@media(max-width:380px)]:w-[250px]" onClick={()=>{dispatch({type:"UPDATE",payload:EditFormFields})}}>بروزرسانی</button>
              <button className="btn btn-warning text-white font-bold text-[18px] [@media(max-width:380px)]:mx-auto  [@media(max-width:380px)]:w-[250px]">بستن</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default EditUserModal;
