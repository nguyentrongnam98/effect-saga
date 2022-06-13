import { student, listResponse, Params } from "../models";
import axiosClient from "./axios";

const apiStudent = {
  getAll(params: Params): Promise<listResponse<student>> {
    const url = "/students";
    return axiosClient.get(url, { params });
  },
  getStudentById(id:string | number):Promise<student> {
    const url = `/students/${id}`;
    return axiosClient.get(url)
  },
  addStudent(data: student): Promise<student> {
    const url = "/students";
    return axiosClient.post(url, data);
  },
  updateStudent(data: student): Promise<student> {
    const url = "/students";
    return axiosClient.patch(url, data);
  },
  removeStudent(id: string | number): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default apiStudent;
