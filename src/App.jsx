import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finish, setFinish] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [task, setTask] = useState(true);
  const [filter, setFilter] = useState(0);
  const [count, setCount] = useState([0, 0, 0]);

  function addHandler() {
    if(todo === ""){
      setTask(false)
      return
    }
    setTask(true)
    setTodos([...todos, todo]);
    setFinish([...finish, (filter === 2)]);

    let newCount = [...count]
    newCount[0]++;
    if(filter === 2) {newCount[filter]++}
    else {newCount[1]++}
    setCount(newCount)

    setTodo("");
  }

  function inputChangeHandler(e) {
    let str = e.target.value
    e.target.value = str.trim()
    if(e.target.value !== "") setTask(true)
    setTodo(e.target.value);
    // setTask(true)
  }

  function editHandler(index) {
    setEdit(index);
    setTodo(todos[index]);
  }

  function editAddHandler() {

    if(todo === ""){
      setTask(false)
      return
    }
    setTask(true)
    let newTodos = [...todos];
    newTodos[edit] = todo;
    setTodos(newTodos);
    setTodo("");
    setEdit(-1);
  }

  function finishHandler(index) {
    let newCount = [...count]
    newCount[1 + finish[index]]--;
    newCount[1 + (!finish[index])]++;
    setCount(newCount)
    
    let newFinish = [...finish];
    newFinish[index] = !newFinish[index];
    setFinish(newFinish);
  }

  function deleteHandler(index){
    let newCount = [...count]
    newCount[0]--;
    newCount[1 + finish[index]]--;
    setCount(newCount)

    let newTodos = [...todos]
    newTodos.splice(index, 1);
    setTodos(newTodos)

    let newFinish = [...finish]
    newFinish.splice(index, 1);
    setFinish(newFinish)
  }

  function filterHandler(value){
    setFilter(value)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5  px-5 max-w-[80vw] min-h-[80vh] bg-white rounded-xl pt-1 pb-10">
        
        <div className="p-5 flex place-content-center mt-10">
          <div className="text-3xl text-indigo-500 font-bold m-auto flex place-content-center">
            <div>Your Todos</div>
          </div>
          <div className="text flex place-content-center h-10">
            <input

              name="todotitle"
              placeholder={task ? "Input Your Task Here" : "Enter the task please!"}
              value={todo}
              onChange={inputChangeHandler}
              type="text"
              className={task ? "border border-indigo-100 w-[50vw] p-2 pl-4 focus:outline-none focus:border-indigo-900 rounded-tl-2xl rounded-bl-2xl" : "border border-indigo-100 w-[50vw] p-2 pl-4 focus:outline-none focus:border-indigo-900 rounded-tl-2xl rounded-bl-2xl placeholder:text-red-600"}
            />
            <button
              onClick={edit != -1 ? editAddHandler : addHandler}
              className="px-4 text-xl text-white bg-indigo-500 hover:bg-indigo-600 transition-all rounded-tr-2xl rounded-br-2xl w-[10vw]"
            >
              {edit != -1 ? "Save" : "Add"}
            </button>
          </div>
        </div>


        <div className="flex flex-col items-center min-h-100 border border-indigo-100 rounded-2xl">
          {count[filter] === 0 && <div className="min-h-100 w-60 flex justify-center items-center">
            <div className="text-2xl text-indigo-200">
              No Such Task Found!
            </div>
            </div>
          }
          {count[filter] !== 0 && <div className="todos w-[60vw] flex flex-col mt-2 gap-2 place-content-center">
            {todos.map((items, index) => {
              if(filter === 1 && finish[index] == true){
                return
              }
              else if(filter === 2 && finish[index] == false){
                return
              }
              return (
                <div key={index} className="box">
                  <div className="todo border border-indigo-50 rounded-2xl min-h-15 flex gap-2 hover:bg-indigo-50">
                    <div className="flex " onClick={() => finishHandler(index)}>
                      <div className="checkbox w-[2vw] flex items-center justify-center">
                      <label className="flex items-center space-x-2">
                        <input
                          name="finish"
                          checked={finish[index]}
                          onChange={() => finishHandler(index)}
                          type="checkbox"
                          className="appearance-none w-5 h-5 border border-indigo-200 rounded-3xl bg-white checked:bg-indigo-600 checked:border-transparent focus:outline-none"
                        />
                      </label>
                    </div>

                    <div title={finish[index] ? "Mark it as not finished" : "Mark it as finished"} className="title w-[47vw] flex place-content-center">
                      <div className={finish[index] ? "text m-5 line-through" : "text m-5"}>
                        {items}
                      </div>
                    </div>
                    </div>
                    <div className="buttons ">
                      <button
                        onClick={() => editHandler(index)}
                        className=" text-white bg-indigo-500 hover:bg-indigo-600 transition-all m-1 mt-3 p-2 rounded w-[4vw]"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteHandler(index)} className=" text-white bg-indigo-500 hover:bg-indigo-600 transition-all m-1 mt-3 p-2 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>}
        </div>

       {/* ---Filter */}
        <div className="flex gap-7 m-3">
          <div>
            <label className="flex items-center space-x-2">
              <input
                name="checkbox"
                checked={filter === 1}
                onChange={() => filterHandler(1)}
                type="checkbox"
                className="appearance-none w-5 h-5 border border-indigo-200 rounded-3xl bg-white checked:bg-indigo-600 checked:border-transparent focus:outline-none"
              />
              <div className="">Show Unfinished</div>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                name="checkbox"
                checked={filter === 2}
                onChange={() => filterHandler(2)}
                type="checkbox"
                className="appearance-none w-5 h-5 border border-indigo-200 rounded-3xl bg-white checked:bg-indigo-600 checked:border-transparent focus:outline-none"
              />
              <div className="">Show Finished</div>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                name="checkbox"
                checked={filter === 0}
                onChange={() => filterHandler(0)}
                type="checkbox"
                className="appearance-none w-5 h-5 border border-indigo-200 rounded-3xl bg-white checked:bg-indigo-600 checked:border-transparent focus:outline-none"
              />
              <div className="">Show All</div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
