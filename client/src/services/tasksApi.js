import axios from 'axios';

export const getData = async (userEmail) => {
  try {
    const response = await axios.get(`http://localhost:8000/tasks/${userEmail}`)
    return response.data
  } catch(err) {
    console.log(err.message)
    return [];  
  }
};
