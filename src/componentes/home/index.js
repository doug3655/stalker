import React,{Component} from 'react'
//import axios from './node_modules/axios';
import axios from 'axios'
import {
    Navbar,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Container,
    Col,
    Form,
    Row,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Spinner
} from 'reactstrap';

import {MdSearch,MdStar} from 'react-icons/md'

import {Link} from 'react-router-dom'

class Home extends Component{
    state = {
        carregando: false,
        buscar: []
    }

    fazerBusca = async (evento) => {
        evento.preventDefault();
        this.setState({carregando:true})
        const url="https://api.nasa.gov/planetary/apod?date="
        const key="xeuKwgCDrbtPEXdMgqxxvjCfCsEE6YnArIcukIEY";
        const forme = evento.target;//pega o form
        const InputGrupo = forme.children[0];//pega o inputGroup
        var inpute = InputGrupo.children[0];//pega o input com o valor
        const Data= inpute.value.split('/').reverse().join('-');
        //const seguidores = await axios(`https://api.github.com/users/${inpute.value}/followers`);
        const buscar = await axios(`${url}${Data}&api_key=${key}`);
       
        
        //this.setState({buscar : buscar.data});
        //ou tambem      2002-02-02
        //const { seguidores: data } = await axios(`https://api.github.com/users/${inpute.value}/followers`);
        //this.setState({seguidores});
        /*for(let i=0;i<seguidores.data.length;i++){
            console.log(seguidores.data[i].login);
        }*/
        
        this.setState({buscar : [buscar.data, ...this.state.buscar],carregando:false})
        //console.log(buscar.data);//printa no console
       // inpute.value = "";//zera o input
        inpute.focus();//volta o focus para o input
    }

    render(){
        return (
            <>  
                <Navbar color="dark">
                        <Container className="d-flex justify-content-center">
                            
                                <img 
                                className="rounded-circle border border-white mr-1"
                                width="50"
                                src="https:www.thispersondowsnotexist.com/image"
                                alt="pessoa aleatoria"/>
                                <span className="text-white">
                                    Logado Como
                                    <Link className="text-white font-weight-bold" to="/">
                                        {this.props.match.params.usuario}
                                    </Link>
                                </span>
                                
                            
                        </Container>
                </Navbar>
                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.fazerBusca}>
                            <InputGroup>
                                <Input type="date"/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="warning" size="sm"/>) :<MdSearch size="20"/>}
                                        </Button>
                                    </InputGroupAddon>
                            </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>
                
                {this.state.carregando ? 
                (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="warning" size="lg"/>
                        <span>Carregando...</span>
                    </Container>
                ) :(
                    <Container className="mt-3 mb-5">
                    <Row>
                    {this.state.buscar.map((buscar) => (
                    <Col xs="12" md="4" className="d-flex mb-3">
                        <Card className="text-white" color="dark">
                            <CardImg top width="100%" height="30%" src={buscar.url} alt={buscar.title}/>
                            <CardBody>
                                <CardTitle className="h3 text-center">{buscar.title}</CardTitle>
                                <CardSubtitle className="text-muted text-center">{buscar.date.split('-').reverse().join('/')}</CardSubtitle>
                                <CardText>{buscar.explanation}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                    </Row>
                </Container>
                /* {this.state.carregando && (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="warning" size="lg"/>
                        <span>Carregando...</span>
                    </Container>                 */
                )}

                {this.state.buscar.length===0 && 
                (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <MdStar color="black" size="150"/>
                        <span><h6>Escolha uma data e veja o que acontece ;)</h6></span>
                    </Container>
                )}
            </>
        );
    }
}

export default Home;