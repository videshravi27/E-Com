import React, {useEffect, useState} from "react"

export default function Counter() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    useEffect(()=> {
        console.log("effect", count) 
    }, [count])

    const clear = () => {
            setCount(0)
    }

    const increment = () => {
        setCount(count + 1)
        console.log(count)
        if(count === 5){
            console.log("Count limit reached")
        }
    }
    const increment2 = () => {
        setCount2(count2 + 1)
        console.log(count2)
    }
    return (
        <>
        <p>Count: {count}</p>
        {count >5 ? null : <button onClick={increment}>+</button>}
        {count >0 ? <button onClick={clear}>Clear</button> : null}
        {/* {count >0 && <button onClick={clear}>Clear</button>}   */}
        <hr />
        <p>Count 2: {count2}</p>
        <button onClick={increment2}>+</button>
        {count2 >0 ? <button onClick={clear}>Clear</button> : null}
        </>
    )
}
