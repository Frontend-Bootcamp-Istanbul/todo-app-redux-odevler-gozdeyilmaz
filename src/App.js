import React, {Component} from 'react';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import RemoveAll from "./RemoveAll";
import "./App.scss";
import Filters from "./Filters";
import {connect} from "react-redux";
import {setTodos, addTodo} from "./actionCreators/actionCreaters";


class App extends Component {

  componentDidMount() {
      console.log("GÜncel proplar", this.props);
    // Component oluştuktan sonra gerekli olan datayı localstoragedan getiriyoruz.
    let localTodos = window.localStorage.getItem("todos");
    if(localTodos){
      localTodos  = JSON.parse(localTodos);
    }
    this.props.setTodos(localTodos || []);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if(JSON.stringify(prevProps.todos) !== JSON.stringify(this.props.todos)){
          window.localStorage.setItem("todos", JSON.stringify(this.props.todos))
      }
  }

  filterTodos = (todos, filterType) => {
    if(filterType === "all"){
        return todos;
    }else if (filterType === "completed"){
        return todos.filter((todo) => todo.checked);
    }else{
        return todos.filter((todo) => !todo.checked);
    }
  }

  render(){
    return (
        <div className="App" id="todo">
            <div className="todo-list todo-list-add">
                <h3>Todo Ekle / Sil</h3>
                <div>
                    <AddTodo />
                    <RemoveAll />
                    <Filters />
                </div>
            </div>
            <TodoList todos={this.filterTodos(this.props.todos, this.props.activeFilter)} />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeFilter: state.activeFilter,
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
    setTodos: (todos) => {dispatch(setTodos(todos))},
    addTodo: (todo) => {dispatch(addTodo(todo))}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);