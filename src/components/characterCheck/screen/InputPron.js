import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const InputPron = (props) => {
  const [inputAnswer, setInputAnswer] = useState('');
  const { onSubmit, disable } = props;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!inputAnswer) return;
    onSubmit(event, inputAnswer);
    setInputAnswer('');
  }

  return (
    <Form className="m-0" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          placeholder="How to spell this word?"
          aria-label="pron"
          aria-describedby="pron-submit"
          value={inputAnswer}
          readOnly={disable}
          onChange={(event) => { setInputAnswer(event.target.value.toLowerCase()); }}
        />
        <InputGroup.Prepend>
          <Button id="basic-addon1" onClick={submitHandler} style={{ borderBottomRightRadius: '0.25rem' }}>Submit</Button>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};

export default InputPron;