import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div.attrs({
    className: 'container',
})`margin-top: 20px`
  
export default class EmployeeDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             employee: null,
             id: null,
             firstname: null,
             lastname: null,
             emailId: null
        }
    }
    
    componentDidMount = () => {
        this.getEmployee();
    }

    getEmployee = () => {
        
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        axios.get(`http://localhost:9090/api/v1/employees/${id}`)
        .then((res) => {
            console.log(res.data);
            this.setState({
                employee: res.data,
                id: res.data[0].id,
                firstname: res.data[0].firstname,
                lastname: res.data[0].lastname,
                emailId: res.data[0].emailId,
            });
        });
    }
    
    render() {
        return (
            <Container>
            <div>
                <h1>View Employee Details</h1>
                <h3>Id         : {this.state.id}</h3>
                <h3>First name : {this.state.firstname}</h3>
                <h3>Last name  : {this.state.lastname}</h3>
                <h3>Email Id   : {this.state.emailId}</h3>
            </div>
            </Container>
        )
    }
}