import React,{ Component } from "react";
import { Container,Form,Input,Button } from "reactstrap";
export default class Login extends Component{
    logar = (event) =>{
        event.preventDefault();

        const form = event.target;
        const input = form.children[0];

        this.props.history.push(`/home/${input.value}`);
    }
    render(){
        return (
            <Container className="h-100">
                <Form className="h-100 d-flex flex-column aling-items-center justify-content-center"
                onSubmit={this.logar}>
                    <Input className="text-center mt-2"
                    placeholder="Seu login do Git"/>
                    <Button className="w-100" color="dark">
                        Logar    
                    </Button> 
                    
                </Form>
            </Container>
        )
    }
}