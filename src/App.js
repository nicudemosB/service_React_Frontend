import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "reactstrap"


const App = () => {

  const [newMake, setMake] = useState('')
  const [newModel, setModel] = useState('')
  const [newServiceChange, setServiceChange] = useState(true)
  const [newYear, setYear] = useState(1980)
  const [service, setService] = useState([])

//___________________________________________________________________

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
    // console.log(event.target.checked);
    setServiceChange(event.target.checked)
  }

  //___________________________________________________________________

  useEffect(() => {
    axios.get('https://young-anchorage-04692.herokuapp.com/service').then((response) => {
      setService(response.data)
    })
  }, [])

    const handleNewListFormSubmit = (event) => {
    event.preventDefault()
    // console.log(newMake);
    // console.log(newServiceChange);
    axios.post('https://young-anchorage-04692.herokuapp.com/service',
    {
      make: newMake,
      model: newModel,
      year: newYear,
      needService: newServiceChange
    }
    ).then(() => {
      axios.get('https://young-anchorage-04692.herokuapp.com/service').then((response) => {
        setService(response.data)
      })
    })
  }

  const handleToggleNeedService = (serviceData) => {
    // console.log(serviceData);
    axios.put(`https://young-anchorage-04692.herokuapp.com/service/${serviceData._id}`,
      {
        make: serviceData.make,
      
        needService: !serviceData.needService
      }
    )
    .then(() => {
      axios.get('https://young-anchorage-04692.herokuapp.com/service')
        .then((response) => {
          setService(response.data)
      })
    })
  }

//___________________________________________________________________

const handleDelete = (serviceData) => {
  // console.log(serviceData);
  axios.delete(`https://young-anchorage-04692.herokuapp.com/service/${serviceData._id}`).then(() => {
    axios.get('https://young-anchorage-04692.herokuapp.com/service')
    .then((response) => {
      setService(response.data)
    })
  })
}

//___________________________________________________________________

  return (
    <main className="App">
      <h1>The Car Shop</h1>
      <table>
      <section>
        <h2>Register a Vehicle</h2>
        <form onSubmit = {handleNewListFormSubmit}>
          Make: <input type='text' onChange={handleNewMakeChange} /><br/>
          Model: <input className='model' type='text' onChange={handleNewModelChange} /><br/>
          Year: <input className='year' type='number' onChange={handleNewYearChange} /><br/>
          Needs Service <input type='checkbox' onChange={handleNewServiceChange} /><br/>
          <input className='btn btn-warning' type='submit' value='Submit'></input>
        </form>
      </section>
      <section><br/>
        <h2>Vehicle Status</h2>
        
        <ul className='ul'>
          {
            service.map((service) => {
              return (
              <ul 
              key={service._id}
              onClick = {(event) => {
                handleToggleNeedService(service)
              }}
              > 
                {
                
                service.needService ?
                <strike>{service.make}</strike>
                :
                service.make
                
                }
                {"     "}
                {service.model}
                {"     "}
                {service.year}
                {"     "}
                <Button className='btn' color="info" onClick={(event) => {
                   handleDelete(service)
                }}>Send to Admin</Button>
              </ul>)
            })
          }
        </ul>
      </section>
      </table>
    </main>
  );
}

export default App;
