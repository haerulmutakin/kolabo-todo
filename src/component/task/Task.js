import React, {useEffect, useState} from 'react';
import { Button } from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';


const Task = ({
    taskData
}) => {
    const tasksRef = firebaseDB.firestore().collection('tasks');
    const [ task, setTask ] = useState([]);
    const [ editableTaskValue, setEditableTaskValue ] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setTask(taskData);
    }, [taskData]);

    const handleActionEditTask = (e) => {
        setEditableTaskValue(taskData.title);
        setModal(true);
    }

    const handleTaskUpdateKeyDown = (e, item) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            item.title = e.target.value;
            updateTodo(item);
            setModal(false);
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

    const handleCancel = (item) => {
        item.status = 3;
        updateTodo(item);
        setModal(false);
    }

    const hadnleNextStep = (item) => {
        if (item.status < 3) {
            item.status += 1;
            updateTodo(item);
            setModal(false);
        }
    }

    return (
        <div className="task-container">
            <div className="task-detail" onClick={handleActionEditTask}>
                {task.title}
            </div>
            {modal && 
                <div className="coba-modal">
                    <div className="edit-modal">
                        <textarea 
                            autoFocus 
                            placeholder="Enter task name..." 
                            value={editableTaskValue} 
                            className="task-input" 
                            onChange={(e) => setEditableTaskValue(e.target.value)} 
                            onKeyDown={(e) => handleTaskUpdateKeyDown(e, taskData)} 
                        ></textarea>
                        <div className="edit-action">
                            <Button onClick={() => handleCancel(taskData)} size="sm" color="red">Cancel</Button>
                            <Button onClick={() => hadnleNextStep(taskData)} size="sm" color="blue">Progress</Button>
                        </div>
                    </div>
                    <div className="edit-backdrop" onClick={() => setModal(false)}></div>
                </div>
                }
        </div> 
    )
}

export default Task;