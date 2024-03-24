const { useState, useEffect, useRef } = React

import { utilService } from "../services/util.service.js"

export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))
    // const [done, setDone] = useState(false)

    // let dynValue = done ? 'dones' : ''

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        // if(field === 'isDone'){
        //     setDone(!done)
        // }
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <form >

            <div className="radio-sort flex justify-center align-center">
                <label htmlFor="all">

                    <input defaultChecked type="radio" name="isDone" value="all" id="all" onChange={handleChange} />
                    All
                </label>
                <label htmlFor="done">

                    <input type="radio" name="isDone" value="done" id="done" onChange={handleChange} />
                    Done
                </label>
                <label htmlFor="undone">
                    <input type="radio" name="isDone" value="undone" id="undone" onChange={handleChange} />
                    Active
                </label>
            </div>

            <label htmlFor="title">Todo:</label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="By Todo"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />

            <label htmlFor="pageIdx">Page:</label>
            <input type="number"
                id="pageIdx"
                name="pageIdx"
                placeholder="0"
                value={filterBy.pageIdx}
                onChange={handleChange}
            />

            {/* <label htmlFor="finishedTodos"></label>
            <input type="checkbox" name="isDone" id="finishedTodos"
              value={dynValue} onChange={handleChange}/> */}


        </form>
    )
}