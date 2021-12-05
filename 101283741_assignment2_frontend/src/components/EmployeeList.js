import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const Container = styled.div.attrs({
    className: 'container',
})`margin-top: 20px`
export default class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
    }

    componentDidMount = () => {
        this.getEmployees();
    }

    getEmployees = () => {
        axios.get("http://localhost:9090/api/v1/employees")
        .then((res) => {
            console.log(res.data);
            this.setState({employees: res.data});
        });
    }

    deleteEmployee = (id) => {
        axios.delete(`http://localhost:9090/api/v1/employees/${id}`)
        .then((res) => {
            console.log(res.data);
            alert("Employee deleted!");
            window.location.reload();
        });
    }

    render() {
        return (
            <Container>
            <div className="border">
                
                <table className="table table-dark">
                   <thead>
                    <tr itemScope="row">
                        <th itemScope="col">ID</th>
                        <th itemScope="col">First Name</th>
                        <th itemScope="col">Last Name</th>
                        <th itemScope="col">Email</th>
                        <th itemScope="col">Actions</th>
                    </tr>
                    </thead>
                {
                    this.state.employees.map((e) => (
                        <tbody>
                        <tr itemScope="row">
                            <td>{e.id}</td>
                            <td>{e.firstname}</td>
                            <td>{e.lastname}</td>
                            <td>{e.emailId}</td>
                            <td>
                                <Link to={`/add/${e.id}`}>
                                    <button className="update_btn">Update</button>
                                </Link>
                                <button className="delete_btn" onClick={() => this.deleteEmployee(e.id)}>Delete</button>
                                <Link to={`/view/${e.id}`}>
                                    <button className="view_btn">View</button>
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    ))
                }
                </table>
            </div>
            </Container>
        )
    }
}