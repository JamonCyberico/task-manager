import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { postData } from "../services/tasksApi";

function Modal({ setIsModalOpen, mode}) {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    user_email: "name@email.com",
    title: "",
    urgency: 1,
    date: isEdit ? "" : new Date(),
  });

  useEffect(() => {
    if (mode === "edit") {
      setIsEdit(true);
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addTask = async (e) => {
    try {
      await postData(data).then((res) => {
        setIsModalOpen(false)
      })
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? "Edit Task" : "Add New Task"}</h3>
          <XMarkIcon className="icon" onClick={() => setIsModalOpen(false)} />
        </div>
        <form>
          <label className="label">Title</label>
          <input 
            required
            name="title"
            id="title"
            type="text" 
            placeholder="Please enter your task title"
            value={data.title}
            onChange={handleChange}
          />
          <label className="label">Urgency</label>
          <input
            required
            name="urgency"
            id="urgency"
            type="range"
            min="1"
            max="5"
            value={data.urgency}
            onChange={handleChange}
          />
          <input type="submit" className="submit-button" onClick={isEdit ? addTask : addTask}/>
        </form>
      </div>
    </div>
  );
}

export default Modal;
