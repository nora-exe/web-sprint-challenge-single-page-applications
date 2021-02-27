//This is a reusable checkbox component!

import React from 'react';

//Capitalize first letter of Option Names
const Checkbox = (props) => {
    const {name, onChange, value} = props
    const labelName = name => {
        const words = name.split("_");
        return words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");
    }
    return (
        <><input
            type='checkbox'
            name={name}
            onChange={onChange}
            checked={value}
        />
        <label>{labelName(name)}</label></>
    )
}
export default Checkbox;
