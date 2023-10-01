import React, { useContext } from 'react';

import Card from 'react-bootstrap/Card';
import { NoteContext } from '../App';






const Bin = () => {
  
    const {state}=useContext(NoteContext)
        // console.log("deletedItem", deletedItems);
    return (
        <div className='container' >
            <h2>Deleted Items</h2>
            <ul>
                {state.deletedItems.map((val, index) => (
                    <div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title> {val.Title} </Card.Title>
                            <Card.Text>
                                {val.Note}
                            </Card.Text>
                           
                        </Card.Body>
                    </Card>
                </div>
                ))}
            </ul>

        </div>
    );
};

export default Bin;