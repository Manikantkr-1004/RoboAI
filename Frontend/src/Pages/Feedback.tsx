import React from 'react'

export function Feedback() {

    let str = localStorage.getItem("feedback");
    let data;
    str? data=JSON.parse(str): data=""
    const extractedPart = data.match(/Communication skills: [\d/]+|Technical skills: [\d/]+|Hiring criteria: [\w]+/gi).join('\n');
    let feed = extractedPart.split(":")
    

    return (
        <div className='w-1/2 m-auto mt-10 bg-red-200'>
            <h1 className='text-center font-bold'>Communication Skills:- {feed[1].split("\n")[0].split("/")[0]}/10</h1>
            <h1 className='text-center font-bold'>Technical Skills:- {feed[2].split("\n")[0].split("/")[0]}/10</h1>
            <h1 className='text-center font-bold'>Hiring Criteria:- {feed[3]}</h1>
        </div>
    )
}
