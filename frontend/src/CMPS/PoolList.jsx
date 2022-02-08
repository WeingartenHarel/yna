import React, { useState, useEffect } from 'react';
import { poolService } from '../services/poolService';

export function PoolList({ pools }) {
    const [checkedColor, setCheckedColor] = useState({
        red:false,
        green:false,
        blue:false,
        yellow:false,
    })
    const [selectedColor, setSelectedColor] = useState(null)
    const [formId, setFormId] = useState(null)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        console.log('hey formId =',formId)
    },[formId]);

    const handleSubmitSelecteColor = (event) =>{
        event.preventDefault();
        const name = event.target.name
        const value = !checkedColor[name]
        const formId = event.target.getAttribute('data-id') ;

        setFormId(formId)
        setCheckedColor({[name]: value})
        setSelectedColor(name)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let poolIndex = pools.findIndex(pool => pool._id === formId)
        let pool = {...pools[poolIndex]}
        let optionIndex = pool.options.findIndex(option => option.option === selectedColor)
        pool.options[optionIndex].value++;
        // console.log('pool ',pool)

        let updatedPool = await poolService.update(pool);
        console.log('updatedPool',updatedPool)

        setCheckedColor({red:false,
            green:false,
            blue:false,
            yellow:false,})
    }

    const List = () => {
        return (
            pools.map(pool => {
                // console.log('pool', pool)
                return (<div class="pool-container" key={pool._id}>
                    <form value={pool} onSubmit={handleSubmit}>
                        <input name="pool" type="text" readOnly hidden value={pool} />
                        <span>Name: {pool.title}</span>
                        {pool.options.map( option =>{
                           return( <div>
                            <input data-id={pool._id} name={option.option}  value={option.option} checked={checkedColor[option.option]} onChange={handleSubmitSelecteColor} type="radio" />
                            <span><span class={option.option}>{option.option} </span>{option.value}</span>
                            </div>)
                        })}
                        <button type="submit" value={pool}>Submit Vote</button>
                    </form>
                </div>)
            })

        )
    }

    return (
        <div class="pools-container">
            Pools List:
            <List />

        </div>
    );
}
