import axios from "axios";

const instance = axios.create({
	baseURL:
		"https://react-my-burger-8ea69-default-rtdb.europe-west1.firebasedatabase.app",
});


export default instance;