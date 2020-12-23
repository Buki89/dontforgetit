
export type Task = {
    id: string,
    taskName:string,
    deadline: Date;
    createdAt: Date;
    completed: boolean;
} 

export interface State  {
    tasks: Task[];
    uid: string;
}



type Type = 'ADD_TASK' | 'REMOVE_TASK' | 'EDIT_TASK' | 'SET_TASKS' | 'SET_UID';


export type Actions = {
    type: Type,
    payload: any;
}

const Reducer = (state: State, action: Actions): State => {
    switch (action.type) {
         case 'SET_TASKS':
             return {
                 ...state,
                tasks: action.payload                 
             }  
         case 'SET_UID':
             return {
                 ...state,
                 uid: action.payload
             }     
            
        
        default:
            return state;
    }
};

export default Reducer;