import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { NoteContext } from '../App';






const Bin = () => {
    const {state}=useContext(NoteContext)
      
    return (
        <div className='container' >
            <h2>Archive Items</h2>
            <ul>
                {state.archiveItems.map((val, index) => (
                    <div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                           
                            <Card.Text>
                            {val.Task}
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