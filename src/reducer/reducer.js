import {SET_FILTER, SET_TODOS, ADD_TODO, REMOVE_TODO, REMOVE_ALL,TOGGLE, SHOWING, HIDING} from "../actions/actions";

const rootReducer = function (state = {
    activeFilter: "all",
    todos: [],
    visible: false,
    message: ''
}, action) {
    switch (action.type) {
        case SET_FILTER:
            return {...state, activeFilter: action.activeFilter};
        case SET_TODOS:
            return {...state, todos: action.todos}
        case ADD_TODO:
            if (action.todo.content.length < 5){
              return {...state};
            } else{
              return {...state, todos: state.todos.concat([action.todo])}
            }
        case REMOVE_TODO:
            const newTodos = state.todos.filter((todo) => todo.id !== action.id);
            return {
                ...state,
                todos: newTodos
            };
        case REMOVE_ALL:
            return {
              todos: []
            }
        case TOGGLE:
            return{
              ...state, todos: state.todos.map(todo => {
                if (action.id === todo.id){
                  let currentTodo = {...todo};
                  currentTodo.checked = !currentTodo.checked;
                  return currentTodo;
                } else {
                  return todo;
                }
              })
            }
        case SHOWING:
          if (action.todo.content.length < 5){
            return {...state};
          } else {
            return {...state, visible: true}
          }

        case HIDING:
          return {...state, visible: false}
        default:
            return state;
    }

};

export default rootReducer