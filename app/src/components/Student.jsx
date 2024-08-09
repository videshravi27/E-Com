import React from 'react'

const Student = (props) =>{
    console.log(props)
    return (
        <>    
            <div>Name: {props.student.name}</div>
        <div>Age: {props.student.age}</div>
        </>
    )
}
export default Student;
