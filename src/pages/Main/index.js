import React, { Component } from 'react';

import api from '../../services/api';


import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: null,
    error: null
  }

  // Load data from local Storage
  componentDidMount(){
    const repositories = localStorage.getItem('repositories');

    if(repositories){
      this.setState({ repositories: JSON.parse(repositories)});
    }
  }

  //Save the data in local storage
  componentDidUpdate(_, prevState){
    const{ repositories } = this.state;

    if(prevState.repositories !== repositories){
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }

  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { newRepo, repositories } = this.state;


    const response = await api.get(`/repos/${newRepo}`).catch(err => {
      this.setState({ error: true });
      return;
    });

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false
    });



  }

  render() {
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus color="#FFF" size={14} />
              )}

          </SubmitButton>
          {error ? <p>Erro no nome do repositório!</p> : null}
        </Form>
        <List>
              { repositories.map(repository => (
                <li key={repository.name}>
                  <span>{repository.name}</span>
                  <a href="">Detalhes</a>
                </li>
              ))}
        </List>
      </Container>


    )
  }

}


