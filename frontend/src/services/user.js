import api from "./axiosClient";

export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ username, password, avatar }) {
    const { data } = await api.post("/users", { username, password, avatar });
    return data;
  },
  async getOne() {
    const { data } = await api.get("/users/profile");
    return data;
  },
  async getName() {
    const { data } = await api.get("/session/username");
    return data;
  },
  async uploadImage({ avatar }){
    const { data } = await api.post("/users/profile", { avatar });
    return data;
  },
  async getAllMess() {
    const { data } = await api.get("/posts");
    return data;
  },
  async poMessage(messageData) {
    const { data } = await api.post("/posts", messageData);
    return data;
  }, 
  async delMessage(messageId) {
    const { data } = await api.delete(`/posts/${messageId}`);
    return data;
  }
};
