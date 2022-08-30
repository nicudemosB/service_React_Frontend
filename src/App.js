import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [newMake, setMake] = useState('')
  const [newModel, setModel] = useState('')
  const [newServiceChange, setServiceChange] = useState(false)
  const [newYear, setYear] = useState(1980)

  const handleNewMakeChange = (event) => {
    // console.log(event.target.value);
    setMake(event.target.value)
  }

  
  const handleNewModelChange = (event) => {
    // console.log(event.target.value);
    setModel(event.target.value)
  }
  
  const handleNewYearChange = (event) => {
    setYear(event.target.value)
  }
  
  const handleNewServiceChange = (event) => {
    console.log(event.target.checked);
  }

  const handleNewListFormSubmit = (event) => {
    event.preventDefault()
    // console.log(newMake);
    // console.log(newServiceChange);
    axios.post('http://localhost:3000/service',
    {
      make: newMake,
      model: newModel,
      year: newYear
      
    })
  }
  return (
    <main className=''>
      <h1>Car Maintenance</h1>
      <section>
        <h2>List of vehicles due for service</h2>
        <form onSubmit = {handleNewListFormSubmit}>
          Make: <input type='text' onChange={handleNewMakeChange} /><br/>
          Model: <input type='text' onChange={handleNewModelChange} /><br/>
          Year: <input type='number' onChange={handleNewYearChange} /><br/>
          Needs Service <input type='checkbox' onChange={handleNewServiceChange} /><br/>
          <input type='submit' value='Send vehicle for maintenance'></input>
        </form>
      </section>
    </main>
  );
}

export default App;
