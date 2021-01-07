import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { HistoryAnswerContext } from '../../context/historyAnswer.context';

class HistoryList extends React.Component {
  render() {
    return (
      <HistoryAnswerContext.Consumer>
        {
          (context) => {
            const { answers, averAcc, reset } = context;
            return (
              <div>
                <div className="bg-light">
                  <Table className="mb-0 border">
                    <thead className="bg-info text-white text-capitalize">
                      <tr>
                        <th className="text-center">Word</th>
                        <th className="text-center">Correct</th>
                        <th className="text-center">Your</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        answers.map((answer, id) => {
                          if (id < answers.length - 10) {
                            return null;
                          }
                          return (
                            <tr
                              key={id}
                              className={`${answer.res === answer.ans ? 'correct-bg' : 'wrong-bg'} border-0`}
                              style={{
                                backgroundColor: 'white',
                                borderTop: `${id > answers.length - 10 && id < answers.length ? '2px solid gray' : ''}` 
                              }}
                            >
                              <td className="text-center py-1" style={{ fontSize: '150%', borderRight: '1px solid gray' }}>{answer.word}</td>
                              <td className="text-center" style={{ borderRight: '1px solid gray' }}>{answer.res}</td>
                              <td className="text-center">{answer.ans}</td>
                            </tr>
                          );
                        })
                      }
                      <tr>
                        <td colSpan="3" className="text-center">{`Average accuracy: ${Math.round(averAcc*10000)/100}%`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <Button
                    className="font-weight-bold"
                    style={{ borderRadius: '0', width: '100%'  }}
                    variant="danger"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            );
          }
        }
      </HistoryAnswerContext.Consumer>
    );
  }
}

export default HistoryList;