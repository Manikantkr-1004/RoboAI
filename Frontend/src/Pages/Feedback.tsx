import React, { useEffect, useRef,useState } from 'react';
import Chart from 'chart.js/auto';
import { Navbar } from '../Routes/Navbar';
import { Navigate } from 'react-router-dom';

export function Feedback() {

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const [data,setData] = useState<any>([])
  const [hiring,setHiring] = useState<String>("")

    useEffect(()=>{
        let str = localStorage.getItem("feedback");
        let data;
        str? data=JSON.parse(str): data=undefined;
        
        if(data===undefined){
            setData(undefined);
            return;
        }
        const extractedPart = data?.match(/\d+/g);
        const hired = data?.match(/(Hire|Strong Hire|Waitlist|Rejected)/)
        
        setData(extractedPart)
        setHiring(hired[0])
    },[])

  useEffect(() => {
   
    if (chartRef.current) {
      const config = {
        type: 'doughnut',
        data: {
          labels: ['Communication Skills', 'Technical Skills'],
          datasets: [
            {
              data: [8, 7],
              backgroundColor: ['#FF5733', '#3366CC'],
            },
          ],
        },
      };
      new Chart(chartRef.current, config);
    }
  }, []);
  
if(!data){
  return <Navigate to="/" />
}
  

  return (
    <>
    <Navbar />
    <div>

    <div style={{width:"400px"}} className='m-auto mt-28 bg-red-200  rounded-full'>
      <h1 className='text-center font-bold p-2'>Communication Skills:- {data[0]}/10</h1>
      <h1 className='text-center font-bold pb-2'>Technical Skills:- {data[2]}/10</h1>
      <h1 className='text-center font-bold pb-2'>Hiring Criteria:- {hiring}</h1>
    </div>
    <br />
    <div style={{width:"400px"}} className='m-auto'>

    <canvas ref={chartRef} />
    </div><br/>
    <h1 className='text-center  font-bold text-xl'>This is the feedback based on Your Interview with AI.</h1><br/><br/>
    </div>
    </>
  );
}
