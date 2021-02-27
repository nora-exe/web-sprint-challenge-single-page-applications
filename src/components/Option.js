//TODO This is a reusable Options component!

import React from 'react';

//Capitalize first letter of Option Names
const Option = (props) => {
    const {name} = props
    const optionName = name => {
        const words = name.split("_");
        return words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");
    }
    return (
        <option value={name}>{optionName(name)}</option>
    )
}
export default Option;
