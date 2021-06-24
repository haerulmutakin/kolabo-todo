import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Icon, Button } from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';
import { AuthContext } from '../../_provider/AuthProvider';
import Whisper from '../shared/Whisper';
import Task from './Task';


const Board = ({
    title,
    allowNewTask = false,
    allowEditTask = false,
    tasksData,
    theme
}) => {
    const userData = useContext(AuthContext);
    const tasksRef = firebaseDB.firestore().collection('tasks');
    const [ tasks, setTasks ] = useState([]);
    const [ newTaskValue, setNewTaskValue ] = useState('');
    const [ showNewTaskForm, setShowNewTaskForm ] = useState(false);

    useEffect(() => {
        setTasks(tasksData);
    }, [tasksData]);

    const handleNewTaskKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          const newTask = {
              title: e.target.value
          }
          setTasks([...tasks, newTask]);
          addTodo(newTask);
          setNewTaskValue('');
        }
    }

    const addTodo = (newTask) => {
        const payload = {
            id: uuidv4(),
            status: 0,
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

    const handleNewTask = (e) => {
        e.preventDefault();
        setShowNewTaskForm(true);
    }

    const boardStyle = {
        borderColor: theme
    }

    return (
        <div className="board">
            <div className="board-header" style={boardStyle}>
                <div className="board-title-container">
                    <p>{title}</p>
                </div>
                {allowNewTask && <div className="add-task-label" onClick={handleNewTask}><Icon icon="data-increase" /></div>}
            </div>
            <div className="board-content">
                {tasks.map((item, index) => {
                    return (
                        <Task 
                            key={index}
                            editable={allowEditTask}
                            taskData={item} />
                    )
                })}
                {showNewTaskForm && 
                    <div className="whisper-container">
                        <Whisper title="mengaap" onClose={() => setShowNewTaskForm(false)}>
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
                        </Whisper>
                    </div>
                }
                {allowNewTask && <div className="add-task-container">
                    <Button className="add-button" onClick={handleNewTask}><Icon icon="data-increase" /> New task</Button>
                </div>}
                
            </div>
        </div>
    )
}

export default Board;