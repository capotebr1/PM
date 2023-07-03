import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useParams } from 'react-router-dom';

function TasksColumn({ urgency, user_id, owner }) {
    const { id } = useParams();
    const tasksSelector = state => state.tasks.tasks.filter(t => t.urgency_id === urgency);
    const tasks = useSelector(tasksSelector);

    return (
        <div className='tasks-column'>
            {
                tasks.map(t => (
                    <TaskItem
                        key={t.id}
                        id={t.id}
                        projectID={id}
                        name={t.name}
                        urgency={t.urgency_id - 1}
                        description={t.description}
                        creationDate={t.date.slice(0,10)}
                        deadline={t.deadline.slice(0,10)}
                        ownerID={user_id}
                        owner={owner}
                        members={t.members}
                    />
                ))
            }
        </div>
    );
}

export default TasksColumn;