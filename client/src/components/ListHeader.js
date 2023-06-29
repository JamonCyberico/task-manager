import Modal from "./Modal";
import { useState } from "react";

function ListHeader({ fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="list-header">
      <div className="button-container">
        <button className="add" onClick={() => setIsModalOpen(true)}>Add New task</button>
        <button className="logout">Logout</button>
      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} mode={"create"} fetchTasks={fetchTasks}/>}
    </div>
  );
}

export default ListHeader;
