async function selectedActivities(){
    const res=await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
    const users=await res.json();
    const activities={}
    users.map(user=>{
        user?.activities?.map(userActivity=>{
            if(activities[userActivity]){
                activities[userActivity]++;
            }else{
                activities[userActivity]=1;
            }
        })
    })
    return activities;
}

export default selectedActivities;