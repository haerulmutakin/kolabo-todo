import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, IconButton, Icon } from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';
import { AuthContext } from '../../_provider/AuthProvider';
const Board = ({
    title,
    allowNewTask = false,
    tasksData
}) => {
    const userData = useContext(AuthContext);
    const tasksRef = firebaseDB.firestore().collection('coba');
    const [ tasks, setTasks ] = useState([]);
    const [ editableTaskIndex, setEditableTaskIndex ] = useState(-1);
    const [ editableTaskValue, setEditableTaskValue ] = useState('');
    const [ newTaskValue, setNewTaskValue ] = useState('');
    const [ showNewTaskForm, setShowNewTaskForm ] = useState(false);

    useEffect(() => {
        setTasks(tasksData);
    }, [tasksData]);

    const handleNewTaskKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          const newEl = {
              title: e.target.value
          }
          setTasks([...tasks, newEl]);
          console.log(tasks);
          addTodo(newEl);
          setNewTaskValue('');
        }
    }

    const handleTaskUpdateKeyDown = (e, item) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            item.title = e.target.value;
            setEditableTaskIndex(-1);
            updateTodo(item);
          }
    }

    const addTodo = (newTask) => {
        const payload = {
            id: uuidv4(),
            status: 'open',
            priority: 'normal',
            title: newTask.title,
            userId: userData.uid,
            createdAt: firebaseDB.firestore.FieldValue.serverTimestamp()
        }
        tasksRef
        .doc(payload.id)
        .set(payload)
        .catch(err => {
            console.log(err);
        });
    }

    const updateTodo = (updateTask) => {
        tasksRef
            .doc(updateTask.id)
            .update(updateTask)
            .catch(err => {
                console.log(err);
            })
        console.log(updateTask);
    }

    const handleActionEditTask = (index, item) => {
        setEditableTaskValue(item.title);
        setEditableTaskIndex(index);
    }

    const handleNewTask = (e) => {
        e.preventDefault();
        setShowNewTaskForm(true);
    }

    return (
        <div className="board">
            <div className="board-header">
                <div className="board-title-container">
                    <p>{title}</p>
                </div>
                {allowNewTask && <div><Icon icon="data-increase" /></div>}
            </div>
            <div className="board-content">
                {tasks.map((item, index) => {
                    return (
                        <div key={index} className="all-container">
                            {editableTaskIndex === index ? 
                                <textarea 
                                    autoFocus 
                                    placeholder="Enter task name..." 
                                    value={editableTaskValue} 
                                    className="task-input" 
                                    onChange={(e) => setEditableTaskValue(e.target.value)} 
                                    onKeyDown={(e) => handleTaskUpdateKeyDown(e, item)} 
                                ></textarea>
                                : 
                                <div key={index} className="task-container">
                                    {item.title}
                                    <Button onClick={() => handleActionEditTask(index, item)}>Edit</Button>
                                </div> 

                            }
                        </div>
                    )
                })}
                {showNewTaskForm && 
                            <div className="task-input-container">
                                <textarea 
                                    autoFocus 
                                    placeholder="Enter task name..." 
                                    value={newTaskValue} 
                                    className="task-input" 
                                    onChange={(e) => setNewTaskValue(e.target.value)} 
                                    onKeyDown={handleNewTaskKeyDown} 
                                ></textarea>
                            </div>
                        }
                {allowNewTask && <div className="add-task-container">
                    <IconButton  onClick={handleNewTask}  icon={<Icon icon="data-increase" />} placement="left">
                        New Task
                    </IconButton>
                </div>}
                
            </div>
        </div>
    )
}

export default Board;