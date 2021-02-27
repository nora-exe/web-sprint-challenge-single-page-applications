// This is a reusable Radio group!

import React from 'react';

//Capitalize first letter of Radio button labels
const Radio = (props) => {
    const {name, value, groupName, onChange} = props
    const radioLabel = name => {
        const words = name.split("_");
        return words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");
    }
    return (
        <><input
                type="radio"
                id={name}
                name={groupName}
                value={name}
                checked={value === name}
                onChange={onChange}
        />
        <label for={name}>{radioLabel(name)}</label></>
    )
}
export default Radio;
