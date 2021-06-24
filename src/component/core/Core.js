import React, {useState, useEffect } from 'react';
import { Grid, Col} from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';
import Header from '../common/Header';
import Board from '../board/Board';

const Core = () => {
    const taskRef = firebaseDB.firestore().collection('tasks');
    const [openTasks, setOpenTasks] = useState([]);
    const [progress, setProgress] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [canceledTasks, setCanceledTasks] = useState([]);

    useEffect(() => {
        getTasks()
    }, []);

    const getTasks = () => {
        taskRef
            .orderBy('createdAt', 'asc')
            .onSnapshot((result) => {
                const data = [];
                result.forEach(item => {
                    data.push(item.data())
                });
                setOpenTasks(data.filter(item => item.status === 0));
                setProgress(data.filter(item => item.status === 1));
                setDoneTasks(data.filter(item => item.status === 2));
                setCanceledTasks(data.filter(item => item.status === 3));
            });
    }


    return (
        <div className="core-container">
            <Header />
            <Grid fluid>
                <Col md={6}>
                    <Board
                        title="TODO"
                        allowNewTask={true}
                        allowEditTask={true}
                        tasksData={openTasks}
                        theme='#2296f3'
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="PROGRESS"
                        allowEditTask={true}
                        tasksData={progress}
                        theme='#ffca28'
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="DONE"
                        tasksData={doneTasks}
                        allowEditTask={true}
                        theme='#4caf50'
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="CANCELED"
                        tasksData={canceledTasks}
                        theme='#272c36'
                    />
                </Col>
            </Grid>
        </div>
    )
}

export default Core;