import { useState } from 'react'
import './App.css'
function App() {
  const sortDate =(a, b) => new Date(a.date) - new Date(b.date);
  const [arr,setArr] = useState([]);
  const [DynamicItem,setDynamicItem] = useState("");
  function handleClick(){
    let input = document.getElementById("input").value;
    let date = document.getElementById("date").value;
    if(input&&date){
      setArr((arr)=>[...arr,{task:input,date:date,isComplete:false}]);
      document.getElementById("input").value = "";
      setDynamicItem("");
    }else{
      alert("Please enter a task and date");
    }
  }
  function handleChange(){
    let input = document.getElementById("input").value;
     setDynamicItem(input);
  }
  function handleSubmit(event){
    if(event.key === "Enter"){
      handleClick();
    }
  }
  function handleDelete(event){
    event.stopPropagation();
    let id = event.target.id;
    let temp = [...arr];
    temp.splice(id,1);
    setArr(temp);
  }
  let completeAll=()=>{
    setArr((arr)=>arr.map((item)=>({...item,isComplete:true})));
  }
  let upperCaseOne=(event)=>{
    event.stopPropagation();
    let id = event.target.id;
    setArr((arr)=>arr.map((item,index)=>(index==id)?{...item,task:item.task.toUpperCase()}:item));
  }
  let handleComplete=(event)=>{
    event.stopPropagation();
    let id=event.target.id;
    setArr((arr)=>arr.map((item,index)=>(index==id)?{...item,isComplete:!item.isComplete}:item));
  }
  return (
      <>
        <div className="container">
          <h1>To Do List</h1>
          <input type="text" id="input" placeholder="Add a new task" autoComplete="off" onChange={handleChange} onKeyDown={handleSubmit}/>
          <br />
          <input type="date" id="date" onKeyDown={handleSubmit}/>
          <button onClick={handleClick}> Add Task</button>
        </div>
        <hr />
        <div className="Items">
          <ol>
            {(DynamicItem)?<li id="dynamic">{DynamicItem}</li>:null}
            {arr.sort(sortDate).map((item,index)=>(
                 <li  id={index} key={index} onClick={()=>handleClick()} className={(item.isComplete)?"completedTask":"notcompleted"} > {item.task} {item.date}
                <button id={index}   onClick={handleDelete}>Delete Task</button> 
                <button id={index}   onClick={upperCaseOne}>Uppercase</button>
                <button id={index}  onClick={handleComplete} className={(item.isComplete)?"completed":"notcompleted"} >{(item.isComplete)?"Completed":"Not Completed"}</button>
                </li>
              ))}
            </ol>
            </div>
            <br />
            <button onClick={completeAll}>Mark All as completed</button>
      </>
  )
}

export default App
