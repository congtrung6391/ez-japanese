import React from 'react';
import HistoryAnswerProvider from '../../context/historyAnswer.context';
import Screen from '../screen/Screen';
import HistoryList from '../historyList/HistoryList';

class Layout extends React.Component {
  render() {
    return (
      <HistoryAnswerProvider>
        <div className="layout">
          <div className="col-md-5 mr-4 mb-2 p-0 bg-light" style={{ minHeight: '35vh', maxHeight: '55vh' }}>
            <Screen />
          </div>
          <div className="col-md-3 p-0" style={{ minHeight: '628px' }}>
            <HistoryList />
          </div>
        </div>
      </HistoryAnswerProvider>
    );
  }
}

export default Layout;