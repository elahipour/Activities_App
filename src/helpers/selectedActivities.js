async function selectedActivities() {  
    // بارگذاری users از localStorage  
    const users = JSON.parse(localStorage.getItem('users')) || [];  
    const activities = {};  

    // پردازش فعالیت‌ها  
    users.forEach(user => {  
        user?.activities?.forEach(userActivity => {  
            if (activities[userActivity]) {  
                activities[userActivity]++;  
            } else {  
                activities[userActivity] = 1;  
            }  
        });  
    });  
    
    return activities;  
}  

export default selectedActivities;  