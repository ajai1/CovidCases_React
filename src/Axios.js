import axios from "axios";

const instance = axios.create({
  baseURL: "https://coronavirus-monitor.p.rapidapi.com/coronavirus",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "bcc1e03d10msha9fec7c4a41fb1ep106e29jsna354e10b941d",
    useQueryString: true,
  },
});

export default instance;
