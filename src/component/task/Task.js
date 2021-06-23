import React, {useEffect, useState} from 'react';
import { Button } from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';


const Task = ({
    taskEditable = true,
    taskData
}) => {
    const tasksRef = firebaseDB.firestore().collection('coba');
    const [ task, setTask ] = useState([]);
    const [ taskEditMode, setTaskEditMode ] = useState(false);
    const [ editableTaskValue, setEditableTaskValue ] = useState('');

    useEffect(() => {
        setTask(taskData);
    }, [taskData]);

    const handleActionEditTask = (e) => {
        setEditableTaskValue(taskData.title);
        setTaskEditMode(true);
    }

    const handleTaskUpdateKeyDown = (e, item) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            item.title = e.target.value;
            updateTodo(item);
            setTaskEditMode(false);
          }
    }

    const updateTodo = (updateTask) => {
        tasksRef
            .doc(updateTask.id)
            .update(updateTask)
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="all-container">
            {taskEditMode ? 
                <textarea 
                    autoFocus 
                    placeholder="Enter task name..." 
                    value={editableTaskValue} 
                    className="task-input" 
                    onChange={(e) => setEditableTaskValue(e.target.value)} 
                    onKeyDown={(e) => handleTaskUpdateKeyDown(e, taskData)} 
                ></textarea>
                : 
                <div className="task-container">
                    {task.title}
                    {taskEditable && <Button onClick={handleActionEditTask}>Edit</Button>}
                </div> 

            }
        </div>
    )
}

export default Task;