const { useState, useEffect, useRef } = React

import { utilService } from "../services/util.service.js"

export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))
    const [done, setDone] = useState(false)

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        if(field === 'isDone'){
            setDone(!done)
        }
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <form >
            <label htmlFor="title">Todo:</label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="By Todo"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
            {/* <label htmlFor="finishedTodos"></label>
            <input type="checkbox" name="isDone" id="finishedTodos"
              value={done} onChange={handleChange}/> */}


        </form>
    )
}