import React, {useState, useEffect } from 'react';
import { Grid, Col} from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';
import Header from '../common/Header';
import Board from '../board/Board';

const Core = () => {
    const taskRef = firebaseDB.firestore().collection('coba');
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
                setOpenTasks(data.filter(item => item.status === 'open'));
                setProgress(data.filter(item => item.status === 'progress'));
                setDoneTasks(data.filter(item => item.status === 'done'));
                setCanceledTasks(data.filter(item => item.status === 'canceled'));
            });
    }


    return (
        <div>
            <Header />
            <Grid fluid>
                <Col md={6}>
                    <Board
                        title="TODO"
                        allowNewTask={true}
                        tasksData={openTasks}
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="PROGRESS"
                        tasksData={progress}
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="DONE"
                        tasksData={doneTasks}
                        allowEditTask={false}
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="CANCELED"
                        tasksData={canceledTasks}
                    />
                </Col>
            </Grid>
        </div>
    )
}

export default Core;