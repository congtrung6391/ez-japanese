import React from 'react';
import axios from 'axios';

export const NewWordContext = React.createContext();

class NewWordProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newWordList: JSON.parse(localStorage.getItem('newWordList') || '[]'),
      addNewWord: this.addNewWord, 
      removeWord: this.removeWord,
      addAnswer: this.addAnswer,
      check: this.check,
      shuffle: this.shuffle,
      checkSingle: this.checkSingle,
      searchCollection: this.searchCollection,
      makeCollection: this.makeCollection,
      getCollection: this.getCollection,
    };
  }

  saveToLocal = () => {
    const { newWordList } = this.state;
    const words = newWordList.map(word => {
      return {
        word: word.word,
        answer: word.answer,
        userAnswer: '',
        check: null,
      };
    })
    localStorage.setItem('newWordList', JSON.stringify(words));
  }

  addNewWord = (word, answer) => {
    const { newWordList } = this.state;
    newWordList.push({ word, answer, userAnswer: '', check: null });
    this.setState({ newWordList });
    this.saveToLocal();
  }

  removeWord = ( index ) => {
    const { newWordList } = this.state;
    newWordList.splice(index, 1);
    this.setState({ newWordList });
    this.saveToLocal();
  }

  addAnswer = (index, answer) => {
    const { newWordList } = this.state;
    newWordList[index].userAnswer = answer;
    this.setState({ newWordList });
  }

  check = () => {
    const { newWordList } = this.state;
    const res = [];
    newWordList.forEach(word => {
      if (word.answer === word.userAnswer) {
        res.push(true);
      } else {
        res.push(false);
      }
    })
    return res;
  }

  checkSingle = (index) => {
    const { newWordList } = this.state;
    newWordList[index].check = (newWordList[index].answer === newWordList[index].userAnswer);
    this.setState(newWordList);
  }

  shuffle = () => {
    let { newWordList } = this.state;
    newWordList.sort(() => Math.random() - 0.5);
    newWordList = newWordList.map(word => {
      return {
        word: word.word,
        answer: word.answer,
        userAnswer: '',
        check: null,
      }
    })
    this.setState({ newWordList });
  }

  searchCollection = async (name) => {
    const data = await axios.get(`https://japanese-ez-default-rtdb.firebaseio.com/collections.json?`)
      .then(res => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    const listColl = Object.entries(data).filter((coll) => coll[1].name.includes(name));
    return listColl;
  }

  getCollection = async (id) => {
    const data = await axios.get(`https://japanese-ez-default-rtdb.firebaseio.com/collections/${id}.json?`)
      .then(res => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    const listWord = JSON.parse(data.data);
    this.setState({ newWordList: listWord });
  }

  makeCollection = async () => {
    const name = prompt("Collection's name");

    const { newWordList } = this.state;

    if (newWordList === null || newWordList.length === 0) return;

    const words = newWordList.map(word => {
      return {
        word: word.word,
        answer: word.answer,
        userAnswer: '',
        check: null,
      };
    })
    const wordsStr = JSON.stringify(words);

    let data = {};
    data = { name: name, data: wordsStr, };
    
    await axios.post(
      `https://japanese-ez-default-rtdb.firebaseio.com/collections.json`,
      data
    );
  }

  render() {
    return (
      <NewWordContext.Provider value={this.state}>
        {this.props.children}
      </NewWordContext.Provider>
    );
  }
}

export default NewWordProvider;