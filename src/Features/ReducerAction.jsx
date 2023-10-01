export default function ReducerAction(state,action){

    switch (action.type) {
        case 'addNote':
          const id = 4 + Math.floor(Math.random() * 300);
          // console.log(action.payload.currentTime);
          return {
            
            ...state,
            value: [...state.value, { id, Title: action.payload.title, Note: action.payload.note, Time : action.payload. currentTime  }],
         
         
          };
        case 'addTask':
          
            
          return {
            ...state,
            value2: [...state.value2, { Task: action.payload.task, setDay: action.payload.date }],
          };
        case 'UPDATE':
          return {
            ...state,
            value: state.value.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  Title: action.payload.title,
                  Note: action.payload.note,
                };
              }
              return item;
            }),
          };
        case 'DELETE':
          return {
            ...state,
            value: state.value.filter((item) => item.id !== action.payload.id),
            deletedItems: [...state.deletedItems, action.payload],
          };
        case 'ARCHIVE':
          console.log(action.payload);
          return {

            
            ...state,
            archiveItems: [...state.archiveItems, {Task: action.payload }],
          };
        default:
          return state;
      }
    };