import React from 'react';
import axios from 'axios';
import { HistoryAnswerContext } from '../../context/historyAnswer.context';
import DisplayWord from './DisplayWord';
import InputPron from './InputPron';

class Screen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      code: 3040,
      font: '',
      startTime: undefined,
      answer: {},
      loading: false,
    };
    this.fonts = [
      'Noto Sans JP',
      'Sawarabi Mincho',
      'Kosugi Maru',
    ]
    this.onAddAnswer = undefined;
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    await this.generateNewWord();
    this.setState({ loading: false });
  }

  generateNewWord = async () => {
    const fontId = Math.round(Math.random()*3) + 0;
    const font = this.fonts[fontId];

    const idx = Math.round(Math.random()*73)+1;
    const { data } = await axios.get(`https://japanese-ez-default-rtdb.firebaseio.com/code-meaning/${idx}.json`);
    this.setState({ word: data.word, font, answer: { ans: '', res: data.spell } });
  }

  submitPron = async (event, userAnswer) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { answer, word } = this.state;
    answer.ans = userAnswer;
    this.setState({ answer });
    this.context.addAnswer({ ...answer, word });
    await setTimeout(async () => {
      await this.generateNewWord();
      this.setState({ loading: false });
    }, 400);
  }

  render() {
    const { word, font, answer, loading } = this.state;

    return (
      <HistoryAnswerContext.Consumer>
      {
        (context) => {
          this.context = context;

          return (
            <div>
              <div>
                <DisplayWord
                  word={word}
                  font={font}
                  answer={answer}
                />
                <div style={{ width: '100%', position: 'absolute', bottom: '0' }}>
                  <InputPron
                    disable={loading}  
                    onSubmit={this.submitPron}
                  />
                </div>
              </div>
              {/* {
                !answer.res && (
                  <div
                    className="d-flex flex-column justify-content-center"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      height: '100%',
                      width: '100%',
                      backdropFilter: 'blur(2px) brightness(90%)',
                    }}
                    onKeyPress={(event) => {console.log(event)}}
                  >
                    <div className="d-flex flex-row justify-content-center">
                      <div>
                        <Button
                          className="mr-2 font-weight-bold"
                          style={{ width: '150px', height: '50px' }}
                          variant="success"
                          onClick={this.generateNewWord}
                        >
                          Continue
                        </Button>
                        <Button
                          className="font-weight-bold"
                          style={{ width: '150px', height: '50px' }}
                          variant="danger"
                          onClick={() => {
                            this.setState({ code: 3041 })
                            this.context.reset();
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              } */}
            </div>
          );
        }
      }
      </HistoryAnswerContext.Consumer>
    );
  }
}

export default Screen;