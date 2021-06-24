import React, {useEffect, useState} from 'react';
import { Button } from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';
import Whisper from '../shared/Whisper';


const Task = ({
    taskData,
    editable = true
}) => {
    const tasksRef = firebaseDB.firestore().collection('tasks');
    const [ task, setTask ] = useState([]);
    const [ editableTaskValue, setEditableTaskValue ] = useState('');
    const [ overlay, setOverlay] = useState(false);

    useEffect(() => {
        setTask(taskData);
    }, [taskData]);

    const handleActionEditTask = (e) => {
        e.preventDefault();
        if (editable) {
            setEditableTaskValue(taskData.title);
            setOverlay(true);
        }
    }

    const handleTaskUpdateKeyDown = (e, item) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            item.title = e.target.value;
            updateTodo(item);
            setOverlay(false);
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
        setOverlay(false);
    }

    const hadnleNextStep = (item) => {
        if (item.status < 3) {
            item.status += 1;
            updateTodo(item);
            setOverlay(false);
        }
    }

    const handleFocus = (e) => {
        const value = e.target.value;
        e.target.selectionEnd = value.length;
    }

    const taskDetailClass = editable ? 'editable' : '';
    const nextStepLabel = task.status === 0 ? 'Progress' : 'Done';

    return (
        <div className="task-container">
            <div className={"task-detail " + taskDetailClass} onClick={handleActionEditTask}>
                {task.title}
            </div>
            {overlay && 
                <div >
                    <Whisper backdrop={true} onClose={() => setOverlay(false)}>
                        <textarea
                            autoFocus
                            onFocus={handleFocus}
                            placeholder="Enter task name..." 
                            value={editableTaskValue} 
                            className="task-input" 
                            onChange={(e) => setEditableTaskValue(e.target.value)} 
                            onKeyDown={(e) => handleTaskUpdateKeyDown(e, taskData)} 
                        ></textarea>
                        <div className="edit-action">
                            <Button onClick={() => handleCancel(taskData)} size="sm" color="red">Cancel</Button>
                            {task.status !== 2 && <Button 
                                onClick={() => hadnleNextStep(taskData)} 
                                size="sm" 
                                color="blue"
                                >{nextStepLabel}</Button>}
                            
                        </div>
                    </Whisper>
                </div>
                }
        </div> 
    )
}

export default Task;