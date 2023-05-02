import axios from "axios";

const instance = axios.create({
  baseURL: "https://dkgicggupnrxldwvkeft.supabase.co",
});

export default instance;
