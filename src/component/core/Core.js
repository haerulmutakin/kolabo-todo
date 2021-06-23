import React, {useState } from 'react';
import { Grid, Col, Icon, IconButton } from 'rsuite';
import Header from '../common/Header';

const Core = () => {
    const [newTask, setNewTask] = useState('');
    const [showNewTask, setShowNewTask] = useState(false);
    const [task, setTask] = useState(
        []
    );

    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          const newEl = {
              title: e.target.value
          }
          setTask([...task, newEl]);
          setNewTask('');
        }
    }

    const newTasHandler = (e) => {
        e.preventDefault();
        setShowNewTask(true);
    }
    return (
        <div>
            <Header />
            <Grid fluid>
                <Col className="board" md={6}>
                    <div className="board-header">
                        <div className="board-title-container">
                            <p>TODO</p>
                        </div>
                        <div onClick={newTasHandler}><Icon icon="data-increase" /></div>
                    </div>
                    <div className="board-content">
                        {task.map((item, index) => {
                            return <div key={index} className="task-container">
                                {item.title}
                            </div>
                        })}
                        {showNewTask && 
                        <div className="task-input-container">
                            <textarea 
                                autoFocus 
                                placeholder="Enter task name..." 
                                value={newTask} 
                                className="task-input" 
                                onChange={(e) => setNewTask(e.target.value)} 
                                onKeyDown={onEnterPress} 
                            ></textarea>
                        </div>
                        }
                        <div className="add-task-container">
                            <IconButton onClick={newTasHandler} icon={<Icon icon="data-increase" />} placement="left">
                                Add New Task
                            </IconButton>
                        </div>
                    </div>
                </Col>
                <Col className="board" md={6}>
                    <div className="board-header">
                        <div className="board-title-container">
                            <p>PROGRESS</p>
                        </div>
                    </div>
                    <div className="board-content">
                    </div>
                </Col>
                <Col className="board" md={6}>
                    <div className="board-header">
                        <div className="board-title-container">
                            <p>DONE</p>
                        </div>
                    </div>
                    <div className="board-content">
                    </div>
                </Col>
                <Col className="board" md={6}>
                    <div className="board-header">
                        <div className="board-title-container">
                            <p>CANCELED</p>
                        </div>
                    </div>
                    <div className="board-content">
                    </div>
                </Col>
            </Grid>
        </div>
    )
}

export default Core;