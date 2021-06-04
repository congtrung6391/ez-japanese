import React, { useState, useContext } from 'react';
import { Row, Table, InputGroup, FormControl, Button, Container, ListGroup } from 'react-bootstrap';
import { NewWordContext } from '../../context/newWord.context';

const NewWordList = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [searchColl, setSearchColl] = useState("");
  const [listColl, setListColl] = useState(null);
  const context = useContext(NewWordContext);
  const { newWordList, addNewWord, addAnswer } = context;

  const onAddNewWord = () => {
    addNewWord(word, meaning);
    setWord("");
    setMeaning("");
  }

  const onSearchColl = async () => {
    const list = await context.searchCollection(searchColl);
    setSearchColl("");
    setListColl(list);
    console.log(list);
  }

  return (
    <Container>
      <Row>
        <InputGroup className="col-md-5 mb-0">
          <FormControl
            id="search-coll-input"
            placeholder="Search collection"
            aria-describedby="search-coll"
            value={searchColl}
            onChange={(event) => setSearchColl(event.target.value)}
          />
          <Button variant="outline-secondary" id="search-coll" onClick={onSearchColl}>
            Search
          </Button>
        </InputGroup>
        <InputGroup className="col-md-2 mb-0 ml-auto">
          <Button onClick={() => context.makeCollection()} variant="success">Make Collections</Button>
        </InputGroup>
      </Row>
      <ListGroup className="col-md-5 mb-3" as="ol" style={{ textAlign: 'left' }}>
        {
          listColl !== null && (
            listColl.length === 0
              ? (
                <ListGroup.Item>No result</ListGroup.Item>
              )
              : (
                listColl.map(coll => (
                  <ListGroup.Item as="li" onClick={() => context.getCollection(coll[0])}>{coll[1].name}</ListGroup.Item>
                ))
              )
          )
        }
        {
          listColl !== null && (
            <Button variant="warning" onClick={() => setListColl(null)}>Clear</Button>
          )
        }
      </ListGroup>
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
            newWordList === null || newWordList.length === 0
              ? (
                <tr><td colSpan="6">No new word</td></tr>
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
        <Button className="col-md-1 mr-3" onClick={context.shuffle} variant="info">Shuffle</Button>
        <Button className="col-md-1" onClick={context.check} variant="success">Check</Button>
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