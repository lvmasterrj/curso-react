import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-my-burger-f59cb-default-rtdb.firebaseio.com/",
});

export default instance;
