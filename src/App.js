import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Button,
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand
} from "reactstrap";

const App = () => {

  const [newMake, setMake] = useState('');
  const [newModel, setModel] = useState('');
  const [newYear, setYear] = useState('');
  const [service, setService] = useState([]);
  const [newServiceChange, setServiceChange] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="Tech" style={{display: 'block', width: 300, padding: 10}}>
            <h5></h5>
            <Navbar color="light" light >
                <NavbarBrand href="/">Technician</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="https://safe-refuge-01136.herokuapp.com/">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="http://google.com">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="http://www.mitchell-g.com">Admin 1</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="https://billys-portfolio.netlify.app">Admin 2</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            </div >
      <div>
        <section>
          <h1 className="h1">Vehicle Repair Shop</h1>
          <h3>Register A Vehicle</h3>
          <form onSubmit = {handleNewListFormSubmit}>
            Make: <input type='text' onChange={handleNewMakeChange} /><br/>
            Model: <input className='model' type='text' onChange={handleNewModelChange} /><br/>
            Year: <input className='year' type='number' defaultValue="2000" onChange={handleNewYearChange} /><br/>
            Needs Service <input type='checkbox' defaultChecked={true} onChange={handleNewServiceChange} /><br/>
            <input className='btn btn-warning' type='submit' value='Add to List'></input>
          </form><br/>
        <h3>Vehicle Maintenance List:</h3>
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
                <div>
                <Button color="info" className='text-right' onClick={(event) => {
                  // alert(`${service.make} ${service.model} ${service.year}`+
                  // " Repaired Reported to Admin.")
                  handleDelete(service)
                }}>Send to Admin</Button>
                </div>
              </div>)
            })
          }
        </div>
        </section>
      </div>
    </main>
  );
}

export default App;
  
          