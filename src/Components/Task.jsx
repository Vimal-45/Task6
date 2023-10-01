import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NoteContext } from '../App';






const Task = () => {
    const { state, dispatch } = useContext(NoteContext)
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const myRef = useRef() 

    useEffect(()=>{
        myRef.current.focus()

    },[])



    return (

        <>
            <div className="empty"></div>
            <div className='container ' >
                <div className='noteCom'>
                    <h2>Add a Task</h2><br />
                    <input type="text" placeholder='Add a task...' className="form-control" ref={myRef} value={task} onChange={(e) => setTask(e.target.value)} />
                    <input type="date" className="custom-date-input form-control " value={date} onChange={(e) => setDate(e.target.value)} />

                    <br />
                    <Button onClick={() => {
                        // console.log(!task);
                        if (!task) {
                            return
                        }
                        dispatch({
                            type: "addTask",
                            payload: { task: task, date: date  }
                        })
                        setTask('');
                            console.log(date);

                    }} >ADD</Button>


                </div>    <br />


                {/* created task section----------------------------------------        */}
                <div>
                    <h3  > <i className="bi bi-check2-circle"></i> My Tasks</h3>
                    <div className='taskSection'>
                        <div className='cardContainer'>
                            {state.value2.map((val, index) => (
                                <div className='taskbox' key={index}>
                                    <Card >
                                        <Card.Body style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px -1px 10px 4px', borderRadius: "10px" }} >

                                            <i className="bi bi-circle"></i>
                                            <p className='taskContent' >

                                                <span className='taskTitle'>  {val.Task}</span>
                                                <span className='taskday' >{val.setDay} </span>
                                            </p>

                                            <Button className='button' onClick={() => {

                                                dispatch({ type: 'ARCHIVE', payload: val.Task })
                                            }}><i className="bi bi-star"></i></Button>
                                        </Card.Body>

                                    </Card>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task;