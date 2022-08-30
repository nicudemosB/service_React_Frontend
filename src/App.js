import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [newMake, setMake] = useState('')
  const [newModel, setModel] = useState('')
  const [newServiceChange, setServiceChange] = useState(false)
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
      axios.get('http://localhost:3000/service')
        .then((response) => {
          setService(response.data)
      })
    })
  }

//___________________________________________________________________

const handleDelete = (serviceData) => {
  // console.log(serviceData);
  axios.delete(`https://young-anchorage-04692.herokuapp.com/service/${serviceData._id}`).then(() => {
    axios.get('https://young-anchorage-04692.herokuapp.com/service').then((response) => {
      setService(response.data)
    })
  })
}

//___________________________________________________________________

  return (
    <main className="App">
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
      <section>
        <h2>Service</h2>
        <ul>
          {
            service.map((service) => {
              return (
              <li 
              key={service._id}
              // onClick = {(event) => {
              //   handleToggleNeedService(service)
              // }}
              > {service.make}
                {/* {
                
                service.needService ?
                <strike>{service.make}</strike>
                :
                service.make
                
                } */}
                {/* <button onClick={(event) => {
                   handleDelete(service)
                }}>Delete</button> */}
              </li>)
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default App;
