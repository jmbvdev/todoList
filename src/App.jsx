import s from "./App.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import Todos from "./Components/Todos";
function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  //ADD TODO
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (todoInput === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      description: todoInput,
      completed: false,
    });
    setTodoInput("");
  };

  //READ TODO
  useEffect(() => {
    //Obtener varios documentos de una colección
    //Utilice el metodo onSnapshot por que me permite obtener actializaciones en tiempo real
    // del documento en la database
    /*on Snapshopt es un escuchador en tiempo real de la coleccion alojada en firestore
    esta esta activamente escuchando por cambios en esa coleccion, nos envia un nueco snapshot
    cada vez que haya algun cambio
    */
    const collectionRef = query(collection(db, "todos"));
    const data = onSnapshot(collectionRef, (querySnaptshot) => {
      let todosArray = [];
      querySnaptshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });

    return () => data();
  }, []);

  //UPDATE TODO
  const handleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete todo
  const deleteTodo=async(id)=>{
    await deleteDoc(doc(db,'todos',id))
  }

  return (
    <div className={s.bg}>
      <div className={s.container}>
        <h3>Todo App</h3>
        <form onSubmit={createTodo} className={s.form}>
          <div className={s.input_container}>
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="Add Todo"
            />
            <button className={s.plus}>
              <AiOutlinePlus />
            </button>
          </div>
          {
            todos.length?
          <ul className={s.todo}>
            {todos.map((todo, index) => (
              <Todos todo={todo} key={index} handleComplete={handleComplete} deleteTodo={deleteTodo}/>
            ))}
          </ul>:
          null
          }

          <p className={s.count}>
            {todos.length < 1
              ? "You haven't created any tasks yet"
              : `You have ${todos && todos.length} todos`}
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
