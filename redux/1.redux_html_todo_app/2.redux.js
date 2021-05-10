// Library code
function generateId () {
    return Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36);
}

// App code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}
function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}
function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}
function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}
function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

// our reducer function 
function todos (state = [], action) { // if state is undefined set it to an empty array
    switch(action.type){
        case ADD_TODO:
            return state.concat(action.todo);
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, { complete: !todo.complete})
            ); // mapping to get a new array so we can still have a pure function
        default:
            return state
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat(action.goal);
    case REMOVE_GOAL:
        return state.filter((goal) => goal.id !== action.id);
    default:
        return state;

    }
}


const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
})); // store will have 3 methods: getState, subscribe, dispatch

store.subscribe(() => {
    console.log('The new state is ', store.getState());
    const { goals, todos } = store.getState(); // adding to html the items we are adding with our input field
    document.getElementById('goals').innerHTML = ''; // reset values every time before adding again (not to duplicate)
    document.getElementById('todos').innerHTML = '';
    goals.forEach(addGoalToDom);
    todos.forEach(addTodoToDom);
})


const addTodo = () => {
    const input = document.getElementById('todo');
    const name = input.value;
    input.value = ''
    store.dispatch(addTodoAction({
        name,
        complete: false,
        id: generateId(),
    }));
}
const addGoal = () => {
    const input = document.getElementById('goal');
    const name = input.value;
    input.value = '';
    store.dispatch(addGoalAction({
        id: generateId(),
        name,
    }));
}

$(document).ready(function() { // some small piece of jquery
    // so we wait the page to be render before doing this code
    document.getElementById('todoBtn')
        .addEventListener('click', addTodo);
    document.getElementById('addGoalBtn')
        .addEventListener('click', addGoal);
});

function createRemoveButton (onClick) {
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'X';
    removeBtn.addEventListener('click', onClick);
    return removeBtn;
}

const addTodoToDom = (todo) => {
    const node = document.createElement('li');
    const text = document.createTextNode(todo.name);
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id));
    });
    node.appendChild(text);
    node.appendChild(removeBtn);
    node.style.textDecoration = todo.complete ? 'line-through' : 'none';
    node.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id));
    })
    document.getElementById('todos')
        .appendChild(node);
}
const addGoalToDom = (goal) => {
    const node = document.createElement('li');
    const text = document.createTextNode(goal.name);
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeGoalAction(goal.id));
    });
    node.appendChild(text);
    node.appendChild(removeBtn);
    document.getElementById('goals')
        .appendChild(node);
}