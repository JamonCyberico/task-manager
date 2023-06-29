import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import ProgressBar from "./ProgressBar";
import Modal from './Modal';
import { deleteData } from '../services/tasksApi';

function ListItem({ task, fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      try {
        await deleteData(id).then((res) => {
          fetchTasks();
        });
      } catch (err) {
        console.log(err)
      }
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">
        <CheckCircleIcon className="icon" />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>
      <div className="button-container">
        <button className='edit' onClick={() => setIsModalOpen(true)}>Edit</button>
        <button className='delete' onClick={() => deleteTask(task.id)}>Delete</button>
      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} mode={"edit"} task={task} fetchTasks={fetchTasks}/>}
    </div>
  );
}

export default ListItem;
