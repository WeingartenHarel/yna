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
        pool.options[0][selectedColor] = pool.options[0][selectedColor]+1
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
                        <div>
                            <input data-id={pool._id} name="red"  value={checkedColor.red} checked={checkedColor.red} onChange={handleSubmitSelecteColor} type="radio" />
                            <span><span class="Red">Red: </span>{pool.options[0].red}</span>
                        </div>
                        <div>
                            <input data-id={pool._id} name="green" checked={checkedColor.green} value={checkedColor.green} onChange={handleSubmitSelecteColor} type="radio" />
                            <span><span class="Green">Green:</span> {pool.options[0].green}</span>
                        </div>
                        <div>
                            <input data-id={pool._id} name="blue" checked={checkedColor.blue} value={checkedColor.blue} onChange={handleSubmitSelecteColor} type="radio" />
                            <span><span class="Blue">Blue:</span> {pool.options[0].blue}</span>
                        </div>
                        <div>
                            <input data-id={pool._id} name="yellow" checked={checkedColor.yellow} value={checkedColor.yellow} onChange={handleSubmitSelecteColor} type="radio" />
                            <span><span class="Yellow">Yellow: </span>{pool.options[0].yellow}</span>
                        </div>
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
