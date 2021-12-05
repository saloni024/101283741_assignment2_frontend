import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
const Container = styled.div.attrs({
    className: 'container',
})`margin-top: 20px`
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
export default class EmployeeAdd extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            add: true,
            id: null,
            firstname: null,
            lastname: null,
            emailId: null
        }
    }
    
    componentDidMount = () => {
        if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) === "_add") {
            this.setState({add: true})
        } else {
            this.setState({add: false});
            const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
            axios.get(`http://localhost:9090/api/v1/employees/${id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    id: res.data[0].id,
                    firstname: res.data[0].firstname,
                    lastname: res.data[0].lastname,
                    emailId: res.data[0].emailId,
                });
            });
        }
    }

    addEmployee = () => {
        const newEmployee = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailId: this.state.emailId
        }
        axios.post("http://localhost:9090/api/v1/employees/", newEmployee)
        .then((res) => {
            console.log(res);
            alert("Employee successfully added!");
        }).catch((res) => {
            console.log(res);
            alert("Please fill out the required fields!");
        });
    }

    updateEmployee = () => {
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        
        
        const updatedEmployee = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailId: this.state.emailId
        }
        
        axios.put(`http://localhost:9090/api/v1/employees/${id}`, updatedEmployee)
        .then((res) => {
            console.log(res.data);
            this.setState({employees: res.data});
            alert("Employee successfully updated!");
        });
    }

    addOrUpdate = () => {
        if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) === "_add") {
            this.addEmployee();
        } else {
            this.updateEmployee();
        }
        
    }

    render() {
        const { id, firstname, lastname, emailId } = this.state
        return (
           
        <Container>
            <Wrapper>
                {this.state.add?
                <Title>Add Employee</Title>:
                <Title>Update Employee</Title>}

                <Label>Id: </Label>
                <InputText
                    type="number"
                    value={id}
                    onChange={(event)=>this.setState({id: event.target.value})}

                />

                <Label>First name: </Label>
                <InputText
                    type="text"
                    value={firstname}
                    onChange={(event)=>this.setState({firstname: event.target.value})}
                />

                <Label>Last name: </Label>
                <InputText
                    type="text"
                    value={lastname}
                    onChange={(event)=>this.setState({lastname: event.target.value})}
                />

                <Label>Email Id: </Label>
                <InputText
                    type="email"
                    value={emailId}
                    onChange={(event)=>this.setState({emailId: event.target.value})}
                />

                <Button onClick={this.addOrUpdate}>Save</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>
      
            
                  </Wrapper>
                  </Container>
        )
    }
}