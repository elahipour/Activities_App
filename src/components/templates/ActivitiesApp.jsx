import RegisterForm from "../modules/RegisterForm";
import UsersList from "../modules/UsersList";

function ActivitiesApp() {
  return (
    <div className=" flex flex-col gap-2 h-fit bg-[#333] md:grid mx-4 md:grid-cols-3 rounded-md p-2 max-w-[900px]">
      <RegisterForm />
      <UsersList />
    </div>
  );
}

export default ActivitiesApp;
