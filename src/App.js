import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  return (
    <main className="App">
      <h1>Car Maintenance</h1>
      <section>
        <h2>List of vehicles due for service:</h2>
        <form>
          Make: <input type='text'/><br/>
          Model: <input type='text'/><br/>
          Year: <input type='number'/><br/>
          Needs Service <input type='checkbox'/><br/>
        </form>
      </section>
    </main>
  );
}

export default App;
