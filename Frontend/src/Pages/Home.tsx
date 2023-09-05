import { useEffect } from 'react'
import Form from '../Form'
import { Navbar } from '../Routes/Navbar'

export function Home() {
    
    useEffect(()=>{
        localStorage.removeItem("feedback");
        localStorage.removeItem("AI");
        localStorage.removeItem("voice");
    },[])

    return (
        <>
        <Navbar />
            <Form/>
        </>
    )
}
