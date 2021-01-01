export type Task = {
    id: string,
    deadline: number;
    createdAt: number;
    completed: boolean;
    taskName:string,
} 

export interface State  {
    tasks: Task[];
    uid: string;
}



 export enum Type {addTask = 'ADD_TASK' , editCompleted= 'EDIT_COMPLETED' ,deleteTask = 'DELETE_TASK', editTaskName = 'EDIT_TASKNAME', setTasks = 'SET_TASKS', setUid =  'SET_UID', setTask = 'SET_TASK'};


export type Actions = {
    type: Type.addTask,
    payload: Task 
} | {
    type: Type.deleteTask,
    payload: string;
} | {
    type: Type.setTasks,
    payload: Task[]
} | {
    type: Type.setUid,
    payload: string;
} | {
    type: Type.editTaskName,
    payload: {
        id:string,
        taskName: string,
    } 
} | {
    type: Type.editCompleted,
    payload: {
        id:string,
        completed: boolean,
    } 
} 


| {
    type: Type.setTask,
    payload:{
        task: Task
    } 
}

const Reducer = (state: State, action: Actions): State => {
    switch (action.type) {
         case Type.setTasks:
             return {
                 ...state,
                tasks: action.payload                 
             }  
         case Type.setUid:
             return {
                 ...state,
                 uid: action.payload
             }
        case Type.deleteTask: 
        return {
            ...state,
            tasks: state.tasks.filter(task => {
                return task.id !== action.payload
            })
        }
        case Type.editTaskName:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if(task.id === action.payload.id){
                        return {
                            ...task,
                            taskName: action.payload.taskName
                        }
                    }
                    return task
                })
            }           
        case Type.editCompleted:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if(task.id === action.payload.id){
                        return {
                            ...task,
                            completed: action.payload.completed
                        }
                    }
                    return task
                })
            }           
        case Type.setTask: 
            return {
                ...state,
                tasks: [...state.tasks,action.payload.task]}
        default:
            return state;
    }   
};

export default Reducer;