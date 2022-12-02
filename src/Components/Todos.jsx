import React from 'react';
import s from "../styles/todos.module.css"
import {FaRegTrashAlt}from "react-icons/fa"
const Todos = ({todo, handleComplete,deleteTodo}) => {

    return (
     
        <li className={s.li}>
            <div className={s.row}>
                <input onChange={()=>handleComplete(todo)} type="checkbox" checked={todo.completed?"checked":""} />
                <p onClick={()=>handleComplete(todo)} className={todo?.completed&& s.check}>{todo?.description}</p>

            </div>
            <button type='button' onClick={()=>deleteTodo(todo.id)}>{<FaRegTrashAlt/>}</button>
        </li>
       
    );
};

export default Todos;