import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

import { getData } from "./services/tasksApi";
import { useEffect, useState } from "react";

function App() {
  const user_email = "name@email.com";
  const [tasks, setTasks] = useState([]);

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
      <ListHeader fetchTasks={fetchTasks}/>
      <div className="list-container">
        {sortedTasks.map((task) => (
          <ListItem task={task} key={task.id} fetchTasks={fetchTasks}/>
        ))}
      </div>
    </div>
  );
}

export default App;
