import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  //state for input
  const [inputWord, setInputWord] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [wrongInput, setWrongInput] = useState(0);
  //state for time
  const [timer, setTimer] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  //state for Gross WPM and Accuracy
  const [gwpm, setGwpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  //Required string state
  const requiredKey = "asdfjkl;";
  const requiredArray = requiredKey.split("");
  console.log(requiredArray);
  const [colorArray, setColorArray] = useState(Array(requiredKey.length).fill(0));

  useEffect(() => {
    let intervalId;
    if(isTyping) {
      intervalId = setInterval(() => {setTimer((prevValue) => prevValue + 1)}, 1000);
    } else {
      clearInterval(intervalId);
      //setTimer(0);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTyping]);

  function keyPress(event) {
    //increase input count
    setInputCount(prevValue => prevValue + 1);
    //Set Input
    const inputKey = event.target.value;
    setInputWord(() => inputKey);
    //Start timer code
    setIsTyping(true);
  }

  function inputCheck() {
    // check if entered key with required key
    const inputLength = inputWord.length;
    if(inputLength !== 0){
      if(requiredKey.charAt(inputLength-1) === inputWord.charAt(inputLength-1)){
        //Key matches
        //console.log("Match");
        //change color at the index
        const list = [...colorArray];
        // console.log(list);
        list[inputLength - 1] = 1;
        setColorArray(list);
        // if all the keys match with number of input
        if(requiredKey === inputWord){        
          //stop timer
          setIsTyping(false);
          //calculate WPM, Accuracy
          calculateResult();
        }
      } else {
        //key does not match
        //console.log("Not Match");
        setWrongInput(prevValue => prevValue + 1);
      }
    }
  }

  useEffect(() => {
    inputCheck();
  }, [inputWord]);

  function calculateResult() {
    //calculate the result
    let timeMinute = timer/60;
    setGwpm(inputCount/(timeMinute*5));//gross wpm
    setAccuracy(((inputCount-wrongInput)/inputCount)*100);//(net wpm/gross wpm)*100
    
    // reset all the fields
    setInputWord("");
    setTimer(0);
    setInputCount(0);
    setWrongInput(0);
    setColorArray(Array(requiredKey.length).fill(0));
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>{timer}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{requiredArray.map((letter, index) => <span key={index} style={{color: colorArray[index] && "red"}}>{letter}</span>)}</h1>
        <p>
          <input className="input" value={inputWord} onChange={keyPress} ></input>
        </p>
        
        <div>
          <h2>WPM(1 min): {gwpm}</h2>
          <h2>Accuracy: {accuracy}</h2>
          <h2>WPM(5 min): {gwpm*5}</h2>
        </div>
      </header>
    </div>
  );
}

export default App;
