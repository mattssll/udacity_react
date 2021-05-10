const logger = (store) => (next) => (action) => { // show us any time something is dispatch and what is new state after dispatch
    console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action) // next will be our dispatch
    console.log ('The new state: ', store.getState())
    console.groupEnd()
    return returnValue
}

export default logger