import React, { useContext, useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { NoteContext } from "../App";



const Note = () => {
    const { state, dispatch } = useContext(NoteContext);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const myRef = useRef() 

    useEffect(()=>{
        myRef.current.focus()

    },[])

    const originalDate = new Date();
    const formattedDateString = `${originalDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}`;

    const Time = `${originalDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}`;

    // console.log(formattedDateString);
    const [currentTime, setCurrentTime] = useState(formattedDateString);
    const [showModal, setShowModal] = useState(false);
    const [editedNote, setEditedNote] = useState({ id: "", Title: "", Note: "" });
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const openEditModal = (note) => {
        console.log(note);
        setEditedNote(note);
        setShowModal(true);
    };

    const closeEditModal = () => {
        setShowModal(false);
    };

    const saveChanges = () => {
        dispatch({
            type: 'UPDATE',
            payload: {
                id: editedNote.id,
                title: editedNote.Title,
                note: editedNote.Note
            }
        });
        closeEditModal();
    };

    return (
        <div className="container ">
            <div className="empty"></div>
            <div className="noteCom" >
                <h3>Add a Note</h3> <br />
                <div className="mb-3">
                    {/* <label className="form-label"></label> */}
                    <input ref={myRef}
                        placeholder="Title"
                        style={{ fontSize: 20 }}
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    {/* <label className="form-label"></label> */}
                    <textarea
                        className="form-control"
                        placeholder="Take a note..."
                        rows="3"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                </div>


                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setCurrentTime(currentTime)
                        if (!title || !note) {
                            return;
                        }
                        console.log(title, note);
                        dispatch({
                            type: 'addNote',
                            payload: {
                                title,
                                note,
                                currentTime

                            }
                        });
                        setTitle("");
                        setNote("");
                        console.log(currentTime);
                    }}> SAVE </button>
                <span><i className=" clok bi bi-clock"></i> </span><span>Today,{Time}</span>
                <div className="icons">
                    <button className="icon-button">
                        <i className="bi bi-fonts"></i>
                    </button>
                    <button className="icon-button">
                        <i className="bi bi-paint-bucket"></i>
                    </button>
                    <button className="icon-button">
                        <i className="bi bi-list-ul"></i>
                    </button>
                    <button className="icon-button">
                        <i className="bi bi-type-underline"></i>
                    </button>
                    <button className="icon-button">
                        <i className="bi bi-text-left"></i>
                    </button>
                    <button className="icon-button">
                        <i className="bi bi-arrow-clockwise"></i>
                    </button>
                    <button className="icon-button">
                        <i className="bi bi-arrow-counterclockwise"></i>
                    </button>
                </div>

            </div> <br />
            <h3> <i className="bi bi-journal-text"></i> My Notes</h3>
            <p>Recently viewed</p> <br />
            <Slider {...settings}>
                {state.value.map((val, index) => (
                    <div key={index}>
                        <Card style={{ width: 317, height: 263, boxShadow: '8px 5px 10px -2px rgba(0, 0, 0, 0.2)', borderRadius: '15px' }}>
                            <Card.Body>
                                <Card.Title>
                                    <p> {val.Title}</p>
                                    <p>
                                        <Button className='button'
                                            onClick={() => {
                                                openEditModal(val);
                                            }}>  <i className="bi bi-pencil"></i>
                                        </Button>

                                        <Button className='button'
                                            onClick={() => {
                                                if (window.confirm(`Confirm Delete ${val.Title} `)) {
                                                    dispatch({
                                                        type: "DELETE", payload: {
                                                            id: val.id,
                                                            Title: val.Title,
                                                            Note: val.Note

                                                        }
                                                    })
                                                };
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button >
                                    </p>
                                </Card.Title>
                                <Card.Text> <p className='notes'>{val.Note} </p>
                                    <p className='time'>{val.Time}</p></Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>

            <Modal show={showModal} onHide={closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedNote.Title}
                            onChange={(e) =>
                                setEditedNote({ ...editedNote, Title: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editedNote.Note}
                            onChange={(e) =>
                                setEditedNote({ ...editedNote, Note: e.target.value })
                            }
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Note;
