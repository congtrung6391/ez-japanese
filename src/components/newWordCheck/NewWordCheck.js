import React, { useState, useContext } from 'react';
import { Row, Table, InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { NewWordContext } from '../../context/newWord.context';

const NewWordList = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const context = useContext(NewWordContext);
  const { newWordList, addNewWord, addAnswer } = context;

  const onAddNewWord = () => {
    addNewWord(word, meaning);
    setWord("");
    setMeaning("");
  }

  return (
    <Container>
      <Table bordered style={{ backgroundColor: 'white' }}>
        <thead className="bg-info text-white text-capitalize">
          <tr>
            <th>#</th>
            <th>Word</th>
            <th>Your answer</th>
            <th>Answer</th>
            <th>Check</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            !newWordList
              ? (
                <tr><td colspan="6">No new word</td></tr>
              ) 
              : (
                newWordList.map((word, index) => (
                  <tr
                    className={`${word.check !== null ? (word.check ? 'correct-bg' : 'wrong-bg') : ''}  border-0`}
                    style={{
                      borderTop: `${index > newWordList.length - 10 && index < newWordList.length ? '2px solid gray' : ''}` 
                    }}
                  >
                    <td>{index}</td>
                    <td>{word.word}</td>
                    <td>
                      <InputGroup>
                        <FormControl
                          aria-label="answer new word"
                          aria-describedby="answer-new-word"
                          value={word.userAnswer}
                          onChange={(event) => { console.log(event.target); addAnswer(index, event.target.value); }}
                        />
                      </InputGroup>
                    </td>
                    <td>{ word.check !== null ? word.answer : ""}</td>
                    <td><Button onClick={() => context.checkSingle(index)} variant="success">Check</Button></td>
                    <td><Button onClick={() => context.removeWord(index)} variant="danger">Remove</Button></td>
                  </tr>
                ))
              )
          }
        </tbody>
      </Table>
      <Row className="mx-0 mb-3">
        <Button className="col-md-2 mr-3" onClick={context.shuffle} variant="info">Shuffle</Button>
        <Button className="col-md-2" onClick={context.check} variant="success">Check</Button>
      </Row>
      <Row>
        <InputGroup className="col-md-5 mb-3">
          <InputGroup.Text id="word">
            Word
          </InputGroup.Text>
          <FormControl
            id="word"
            aria-describedby="word-in-jpd"
            value={word}
            onChange={(event) => { setWord(event.target.value); }}
          />
        </InputGroup>
        <InputGroup className="col-md-5 mb-3">
          <InputGroup.Text id="meaning">
            Meaning
          </InputGroup.Text>
          <FormControl
            id="meaing"
            aria-describedby="word-in-jpd"
            value={meaning}
            onChange={(event) => { setMeaning(event.target.value); }}
          />
        </InputGroup>
        <InputGroup className="col-md-2 mb-3">
          <Button className="col-md-12" onClick={onAddNewWord} variant="success">Add</Button>
        </InputGroup>
      </Row>
    </Container>
  );
}

export default NewWordList;