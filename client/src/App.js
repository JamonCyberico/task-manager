import ListHeader from "./components/ListHeader";
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

  return (
    <div className="App">
      <ListHeader />
    </div>
  );
}

export default App;
