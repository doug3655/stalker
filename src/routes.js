import React,{Component} from 'react';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Login from "./componentes/Login";
import Home from "./componentes/home";

export default class Routes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/Home:usuario" component={Home}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

//history = ['/',]