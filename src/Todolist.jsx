import {useState} from 'react'
import './Todolist.css'
import { v4 as uuidv4 } from 'uuid';

export default function Todolist () {
    let [todos, settodos] = useState([{task: "First Task", id: uuidv4(), completed: false}]);
    let [newtodo, setnewtodo] = useState([""]);

    function addtask () {
        settodos((prevtodo) => {
            return [...prevtodo, {task: newtodo, id: uuidv4(), completed: false}]
        });
        setnewtodo("");
    };

    let updatetodoValue = (event) => {
        setnewtodo(event.target.value );
    };

    let handlekeypress = (event) => {
        if(event.key === "Enter"){
            addtask();
        };
    };

    let deleteTask = (id) => {
        settodos(todos.filter((todo) => todo.id != id ));    
    };

    let updateAll = () => {
        settodos((todos) = todos.map((todo) => {
            return {
                ...todo,
                completed: true
            };
        }));
    };

    let update = (id) => {
        settodos((todos) = todos.map((todo) => {
            if(todo.id === id) {
                return{
                    ...todo,
                    completed: true 
                }
            }
            else
                return todo;
          })
        );
    };


    let resetAll = () => {
        settodos((todos) = todos.map((todo) => {
            return {
                ...todo,
                completed: false
            }
        }));
    }

    return (
        <>
            <div>
                <h1>Todo List</h1>
               <input  placeholder="Add a task" value={newtodo} 
                    onChange={updatetodoValue} onKeyDown={handlekeypress}></input>
                &nbsp; &nbsp;
                <button onClick={addtask}>Add task</button>
                <br></br>
                <br></br>
            </div>

            <hr></hr>

            <h2 id="ulist">Todo Tasks</h2>
            <ol>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={ todo.completed ? {textDecorationLine: "line-through"} : {} }>
                            {todo.task}</span>
                        &nbsp;&nbsp;
                        <div>
                            <button onClick={() => deleteTask(todo.id)}>Delete</button>
                            &nbsp;&nbsp;
                            <button onClick={() => update(todo.id)}>complete</button>
                        </div>
                    </li>  
                ))}
            </ol>
            <button onClick={updateAll}>Completed All</button>
            &nbsp;&nbsp;
            <button onClick={resetAll}>Reset All</button>
        </>
    );
}