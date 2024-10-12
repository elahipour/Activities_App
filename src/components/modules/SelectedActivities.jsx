import {  useEffect, useRef} from "react";
import Chart from "chart.js/auto";
function SelectedActivities({activities}) {


  const activities_chart_Elem = useRef();
  
  useEffect(() => {
 
    (async()=>{
      const data = Object.keys(activities).map((activity) => {
        return { type:activity,value: activities[activity] };
      });
      if(window.activityChart != null){
        window.activityChart.destroy();
      }
      window.activityChart = new Chart(activities_chart_Elem.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: data.map((row) => row.type),
          datasets: [
            {
              label: "ثبت شده",
              data: data.map((row) => row.value),
              borderWidth: 1
            },
          ],
        },
      }); 
    })()
    if(!Object.keys(activities).length){
      window.activityChart.destroy();
    }
  }, [activities])
  
  return (
    <div  className={` flex gap-4 bg-slate-800 h-full rounded p-2 ${!Object.keys(activities).length && 'hidden'}`}>
  <ul>
        {Object.keys(activities)?.map((activity) => {
          return (
            <li key={activity}>{activity + " : " + activities[activity]}</li>
            );
          })}
      </ul>
      <div className="[@media(max-width:380px)]:w-[120px] [@media(max-width:380px)]:h-[120px] md:w-[200px] md:h-[200px]">
      <canvas ref={activities_chart_Elem} width={200} height={200} ></canvas>
      </div>
   </div>
  );
}

export default SelectedActivities;
