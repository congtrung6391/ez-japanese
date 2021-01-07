import React from 'react';
import '../../App.scss';

const DisplayWord = (props) => {
  const { word, font, answer } = props;

  return (
    <div
      className={`d-flex flex-column justify-content-center ${answer.ans ? (answer.ans === answer.res ? 'correct-bg' : 'wrong-bg') : ''}`}
      style={{
        height: '50vh',
        maxHeight: '595px',
        textAlign: 'center', 
      }}
    >
      {
        !answer.ans && (
          <p style={{ fontFamily: `${font}, sans-serif`, fontSize: '300px' }}>{word}</p>
        )
      }
      {
        answer.ans && (
          <span>
            {
              answer.ans === answer.res
              ? <span className="far fa-check-circle" style={{ fontSize: '150px' }} />
              : (
                <div>
                  <i className="far fa-times-circle" style={{ fontSize: '150px', paddingBottom: '0' }} />
                  <p style={{ fontSize: '100px', paddingTop: '0' }}>{answer.res}</p>
                </div>)
            }
          </span>
        )
      }
    </div>
  );
} 

export default DisplayWord;