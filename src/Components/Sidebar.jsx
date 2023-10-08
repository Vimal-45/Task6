import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { NoteContext } from '../App';
import myPhoto from '../assets/photo.png'




const Sidebar = () => {
 
  const navigate = useNavigate();
  const {state}=useContext(NoteContext)
  // console.log(state);
  

  return (
    <>
      <div className="sidebar">
        <div className="profile">
          <img src= {myPhoto}
            alt="Vimal D"
          />
          <div>
            <h3>{state.user.map((val) => val.name)}</h3>
            <p>{state.user.map((val) => val.email)}</p>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            
            <button
              onClick={() =>{navigate('/')
                } } 
              className="nav-button" 
            ><i className="bi bi-house-door"></i>
              Home
            </button>
          </li>
          <li>
            
            <button
              onClick={() => navigate('/note')}
              className="nav-button" 
            >
             <i className="bi bi-journal-text"></i> Note
            </button>
          </li>
          <li>
            
            <button
              onClick={() => navigate('/search')}
              className="nav-button" 
            >
            <i className="bi bi-search"></i>  Search
            </button>
          </li>
          <li>
            
            <button
              onClick={() => navigate('/task')}
              className="nav-button" 
            >
              <i className="bi bi-check2-circle"></i>Task
            </button>
          </li>
          <li>
           
            <button
              onClick={() => navigate('/archive')}
              className="nav-button" 
            >
             <i className="bi bi-archive"></i>  Archive
            </button>
          </li>
          <li>
           
            <button
              onClick={() => navigate('/bin')}
              className="nav-button" 
            >
             <i className="bi bi-trash"></i>  Bin
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
