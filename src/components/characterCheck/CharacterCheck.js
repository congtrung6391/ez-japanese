import React from 'react';
import HistoryAnswerProvider from '../../context/historyAnswer.context';
import Screen from './screen/Screen';
import HistoryList from './historyList/HistoryList';
import { Container } from 'react-bootstrap';

class CharacterCheck extends React.Component {
  render() {
    console.log("character");
    return (
      <HistoryAnswerProvider>
        <Container className="layout">
          <div className="col-md-5 mr-2 mb-2 p-0 bg-light" style={{ height: '628px' }}>
            <Screen />
          </div>
          <div className="col-md-3 p-0">
            <HistoryList />
          </div>
        </Container>
      </HistoryAnswerProvider>
    );
  }
}

export default CharacterCheck;