import React from 'react';
import Checkbox from './Checkbox'
import Option from './Option'
import Radio from './Radio'

//TODO Form
//// Form with /pizza route
//// name text input field ////
//TODO validation for name, must be at least 2 chars
//// DROPDOWN for pizza size
//// RADIO BTN for sauce
//// CHECKLIST for toppings
//// TEXT AREA for special instructions

//Button
//TODO BUTTON add to order - submits form
//TODO BUTTON add to order - returns a database record of name, size, toppings and special instructions


const PizzaForm = props => {
  //Create Array of Pizza Sizes
  const sizes = ['personal', 'medium', 'large', 'pizza_party!'];
//Create Array of Pizza Sauces
  const saucy = ['red', 'white', 'buffalo', 'BBQ', 'korean_BBQ', 'cheese_sauce'];
  //Props
  const {
    values,
    submit,
    change,
    disabled,
    errors, 
    toppings,
    extras,
    subs,
  } = props
  //Prevent default page reload on submit
  const onSubmit = e => {
    e.preventDefault()
    submit()
  }
  //onChange Event
  const onChange = e => {
    const {
        name,
        value,
        type,
        checked,
    } = e.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
}

//Order Form
  return (
    <form className='form container' onSubmit={onSubmit}>
      {/* Enter Name */}
      <div className='name'><label>Name:</label>
        <br />
        <input
            name='name'
            type='text'
            value={values.name}
            onChange={onChange}
            placeholder='  Type your name . . .'
            maxLength='60'
        />
      </div>
      <br />

      {/* Select Size */}
      <div className='selSize'><label>Choose Size:</label> 
        <br />
        <select value={values.sizes} name='sizes' onChange={onChange}>
          <option value=''> What size? </option>
          {
            sizes.map((size, i) => {
              return (<Option name={size} onChange={onChange} key={i}/>)
            })
          }
        </select>
      </div>
      <br />

      {/* Choose Sauce (radio) */}
      <div className='radioSauce'><label>Choose Sauce:</label>
        <br /><div className="columnize">
        {
          saucy.map((sauce, i) => {
            return (
              <Radio
                name={sauce}
                value={values.sauce}
                groupName='sauce'
                onChange={onChange}
                key={i}
              />
            )
          })
        }</div>
      </div>  
      <br />

      {/* Choose Toppings (checkbox) */}
      <div className='cbxToppings'><label>Add Toppings:</label>
        <br />
        {
          toppings.map((topping, i) => {
            return (<Checkbox
              name={topping}
              onChange={onChange}
              value={values[topping]}
              key={i}
            />)
          })
        }
      </div>
      <br />

      {/* Add Extras (checkbox) */}
      <div className='cbxExtras'><label>Load Up! (+$1/each)</label>
        <br />
        {
          extras.map((extra, i) => {
            return (<Checkbox
              name={extra}
              onChange={onChange}
              value={values[extra]}
              key={i}
            />)
          })
        }
      </div>
      <br />

      {/* Choose Substitutes (checkbox) */}
      <div className='cbxSub'><label>Substitutions (free!)</label>
        <br />
        {
          subs.map((sub, i) => {
            return (<Checkbox
              name={sub}
              onChange={onChange}
              value={values[sub]}
              key={i}
            />)
          })
        }
      </div>
      <br />

      {/* Special Instructions */}
      <div className='txtSpecial'><label>Special Instructions:</label>
        <br /><br />
        <textarea
          name='special'
          type='text'
          value={values.special}
          onChange={onChange}
          placeholder='Anything else you need us to know?'
          rows={5}
          cols={30}
        />
      </div>

      {/* Submit Order */}
      <div className='btnSubmit'>
        <button disabled={disabled}>Add To Order</button>
      </div>

      {/* Errors      */}
      <div className='errors'>
        <div>{errors.name}</div>
        <div>{errors.sizes}</div>
        <div>{errors.sauce}</div>
      </div>    
    </form>
    );
  };
export default PizzaForm;