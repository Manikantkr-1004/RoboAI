import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function Feedback() {
  let str = localStorage.getItem("feedback");
  let data;
  str ? (data = JSON.parse(str)) : (data = "");
  const extractedPart = data.match(/Communication skills: [\d/]+|Technical skills: [\d/]+|Hiring criteria: [\w]+/gi).join('\n');
  let feed = extractedPart.split(":");

  const chartRef = useRef<HTMLCanvasElement | null>(null);

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

  return (
    <div>

    <div className='w-1/3 m-auto mt-10 bg-red-200  rounded-full'>
      <h1 className='text-center font-bold p-2'>Communication Skills:- {feed[1].split("\n")[0].split("/")[0]}/10</h1>
      <h1 className='text-center font-bold pb-2'>Technical Skills:- {feed[2].split("\n")[0].split("/")[0]}/10</h1>
      <h1 className='text-center font-bold pb-2'>Hiring Criteria:- {feed[3]}</h1>
    </div>
    <br />
    <div className='w-1/3 m-auto'>

    <canvas ref={chartRef} />
    </div>
    </div>
  );
}
