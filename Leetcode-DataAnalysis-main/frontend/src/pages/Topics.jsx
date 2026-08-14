import { useEffect,useState } from "react";
import axios from "axios";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);

function Topics(){

 const [data,setData] = useState({});

 useEffect(()=>{

  axios
   .get("http://127.0.0.1:8000/topic-analysis")
   .then((res)=>{
      setData(res.data);
   });

 },[]);

 const createChart=(items,color)=>({

  labels: items?.map(x=>x.topic),

  datasets:[
   {
    label:"Problems",
    data: items?.map(x=>x.count),
    backgroundColor: color
   }
  ]
 });

 return(

  <div style={{padding:"30px"}}>

   <h1>Topics Analysis</h1>

   <div style={{
      display:"grid",
      gridTemplateColumns:"1fr 1fr 1fr",
      gap:"20px"
   }}>

    <div>
      <h2>Easy Topics</h2>
      <Bar data={createChart(data.easy,"#10b981")} />
    </div>

    <div>
      <h2>Medium Topics</h2>
      <Bar data={createChart(data.medium,"#f59e0b")} />
    </div>

    <div>
      <h2>Hard Topics</h2>
      <Bar data={createChart(data.hard,"#ef4444")} />
    </div>

   </div>

  </div>
 );
}

export default Topics;