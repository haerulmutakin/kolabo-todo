import React, {useState, useEffect } from 'react';
import { Grid, Col} from 'rsuite';
import firebaseDB from '../../_firebase-conf/firebase.config';
import Header from '../common/Header';
import Board from '../board/Board';

const Core = () => {
    const taskRef = firebaseDB.firestore().collection('coba');
    const [task, setTask] = useState([]);

    useEffect(() => {
        taskRef
            .orderBy('createdAt', 'asc')
            .onSnapshot((resule) => {
                const data = [];
                resule.forEach(item => {
                    data.push(item.data())
                });
                setTask(data);
            });
    }, []);


    return (
        <div>
            <Header />
            <Grid fluid>
                <Col md={6}>
                    <Board
                        title="TODO"
                        allowNewTask={true}
                        tasksData={task}
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="PROGRESS"
                        tasksData={[]}
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="DONE"
                        tasksData={[]}
                    />
                </Col>
                <Col md={6}>
                    <Board
                        title="CANCELED"
                        tasksData={[]}
                    />
                </Col>
            </Grid>
        </div>
    )
}

export default Core;