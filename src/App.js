import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "reactstrap"

const App = () => {

  const [newMake, setMake] = useState('')
  const [newModel, setModel] = useState('')
  const [newYear, setYear] = useState('')
  const [service, setService] = useState([])
  const [newServiceChange, setServiceChange] = useState(true)

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
        model: serviceData.model,
        year: serviceData.year,
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
      <section>
        <h2>Register New Vehicle</h2>
        <form onSubmit = {handleNewListFormSubmit}>
          Make: <input type='text' onChange={handleNewMakeChange} /><br/>
          Model: <input type='text' onChange={handleNewModelChange} /><br/>
          Year: <input type='number' defaultValue="2000" onChange={handleNewYearChange} /><br/>
          Needs Service <input type='checkbox' defaultChecked={true} onChange={handleNewServiceChange} /><br/>
          <input className='btn btn-warning' type='submit' value='Add to List'></input>
        </form>
      </section>
      <section><br/>
        <h2>Vehicle Maintenance List:</h2>
        <div>
          {
            service.map((service) => {
              return (
              <div 
              key={service._id}
              style={{border:'1px solid white'}}
              onClick = {(event) => {
                handleToggleNeedService(service)
              }}
              > 
                {
                service.needService ?
                service.make
                :<strike>{service.make}</strike>
                }
                {"     "}
                {
                service.needService ?
                service.model
                :<strike>{service.model}</strike>
                }
                {"     "}
                {
                service.needService ?
                service.year
                :<strike>{service.year}</strike>
                }
                {"     "}
                <Button color="info" onClick={(event) => {
                  handleDelete(service)
                }}>Send to Admin</Button>
              </div>)
            })
          }
        </div>
      </section>
    </main>
  );
}

export default App;