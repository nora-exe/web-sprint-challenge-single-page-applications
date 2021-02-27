// initial test commit to set up CodeGrade
// git commit --allow-empty -m "Create a CodeGrade submission" && git push --set-upstream origin nora-corser

import {Route, Link, Switch} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import * as yup from 'yup'

import './App.css'

import PizzaForm from './components/PizzaForm'
import formSchema from './validation/formSchema'

//TODO homepage with / route & button that links to Pizza form

// function Home(props) {return <>}

//Create Array of Pizza Toppings
const toppings = ['pepperoni', 'sausage', 'spicy_italian_sausage', 'ham', 'bacon_bits', 'grilled_chicken', 'olives', 'kalamata_olives', 'green_pepper', 'pepperoncini', 'artichoke_hearts', 'tomatoes', 'sun_dried_tomatoes', 'pineapple'];
  //Create Array of Extra Options
const extras = ['extra_cheesy', 'extra_meaty', 'extra_veggie'];
  //Create Array of Dietary Substitution Options
const subs = ['gluten_free', 'dairy_free'];

//Initial Form States
let initialFormValues = {
  name: '',
  sizes: '',
  sauce: '',
  special: '',
}

initialFormValues = toppings.reduce((accumulator, current) => ({ ...accumulator, [current]: false }), initialFormValues)
initialFormValues = extras.reduce((accumulator, current) => ({ ...accumulator, [current]: false }), initialFormValues)
initialFormValues = subs.reduce((accumulator, current) => ({ ...accumulator, [current]: false }), initialFormValues)

const initialFormErrors = {
  name: '',
  sizes: '',
  sauce: '',
}

const initialDisabled = true


const App = () => {
  //States
  const [order, setOrder] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // Side Effect
  useEffect(() => {
    // Adjust status of 'disabled' when formValues changes
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  
  //Validate with Yup
  const inputChange = (name, value) => {
    const toValidate = ['name', 'sizes', 'sauce']
    if (toValidate.includes(name)) {
      yup.reach(formSchema, name)
      .validate(value, {stripUnknown: true})
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })}
    setFormValues({
      ...formValues,
      [name]: value
    })
  }  

  //Form Submit button function
  const formSubmit = () => {
    let newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      sauce: formValues.sauce,
      special: formValues.special.trim(),
    }
    newOrder = toppings.reduce((accumulator, current) => ({ ...accumulator, [current]: formValues[current] }), newOrder)
    newOrder = extras.reduce((accumulator, current) => ({ ...accumulator, [current]: formValues[current] }), newOrder)
    newOrder = subs.reduce((accumulator, current) => ({ ...accumulator, [current]: formValues[current] }), newOrder)
    postNewOrder(newOrder)
  }

  //API Submission helper
  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then(res => {
        setOrder([res.data, ...order])
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    setFormValues(initialFormValues)
  }


  return (
    <div className="App">
      <header className="App-Header">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/pizza">Order</Link>
      </nav>
      <h1>Lambda Eats</h1>
      </header>
      <Switch>
        <Route exact path='/'>Home</Route>
        <Route path='/pizza'>
          <PizzaForm
            values={formValues}
            submit={formSubmit}
            change={inputChange}
            disabled={disabled}
            errors={formErrors}
            toppings={toppings}
            extras={extras}
            subs={subs}
          />
        </Route>
      </Switch>
      
      
    </div>

  );
};
export default App;


