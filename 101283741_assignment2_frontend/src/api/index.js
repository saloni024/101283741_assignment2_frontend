import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:9090/api/v1',
})

export const addEmployee = x => api.post(`/employees`, x)
export const getAllEmployees = () => api.get(`/employees`)
export const updateEmployeeById = (id, x) => api.put(`/employees/${id}`, x)
export const deleteEmployeeById = id => api.delete(`/employees/${id}`)
export const getEmployeeById = id => api.get(`/employees/${id}`)

const apis = {
    addEmployee,
    getAllEmployees,
    updateEmployeeById,
    deleteEmployeeById,
    getEmployeeById
}

export default apis