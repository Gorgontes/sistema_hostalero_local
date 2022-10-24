import { ipcRenderer } from "electron"
export default {
  fetchHabitaciones: async () => {
    return ipcRenderer.invoke('fetchHabitaciones');
  },
  fetchHabitacionesByPiso: async () => {
    return ipcRenderer.invoke('fetchHabitacionByPisos');
  }
}