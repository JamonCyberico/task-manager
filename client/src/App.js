import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";
import Auth from "./components/Auth";

import { getData } from "./services/tasksApi";
import { useEffect, useState } from "react";

function App() {
  const user_email = "name@email.com";
  const authToken = false;

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const fetchTasks = async () => {
    await getData(user_email).then((res) => {
      setTasks(res);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const sortedTasks = tasks.sort((a, b) => {
    return b.urgency - a.urgency;
  });
  
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
      <div>
        <ListHeader fetchTasks={fetchTasks}/>
      <div className="list-container">
        {sortedTasks.map((task) => (
          <ListItem task={task} key={task.id} fetchTasks={fetchTasks} openModal={openModal}/>
        ))}
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} mode={"edit"} task={selectedTask} fetchTasks={fetchTasks}/>}
      </div> 
      )}
    </div>
  );
}

export default App;
