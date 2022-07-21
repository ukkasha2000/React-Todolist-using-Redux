import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo,deleteTodo,updateTodo } from '../../redux/actions/actions';
import './Todo.css';

const Todo = () => {
  const dispatch = useDispatch();
  const myState = useSelector((state)=> state.todoReducer)
  const [filterArray, setFilterArray] = useState([]);
  const [filterCheck, setFilterCheck] = useState(true);
  const [isShowEditBtn, setIsShowEditBtn] = useState(true);
  const [chars,setChars] = useState("");
  const [ind, setInd] = useState();


  let obj = {};
  let field;
  let flag;

  //Storing the input of todo
  const storeInput = () => {
    flag = true;
    field = document.getElementById('todo-form-inputField');

    myState.val.filter(function (val) {
      if (val.task.toLowerCase() === field.value.toLowerCase()) {
        flag = false;
      }
    });
    if (flag === true) {
      obj = { id: myState.val.length + 1, task: field.value };
    }
    else {
      alert("Task Already Exist");
    }
  }

  //Adding new todos 
  const handleSubmit = (e) => {
    e.preventDefault();
    storeInput();
    if (flag != false) {
      dispatch(addTodo(obj));
    }
    setChars("");
    setFilterCheck(()=>{
      return true;
    });
  }

  //Delete Todolist
  const deleteTaskFunc = (id) => {
    const removeItem = myState.val.filter((checker) => {
      return checker.id !== id;
    });
    dispatch(deleteTodo(removeItem));
  }

  //Edit TodoList
  const editTaskFunc = (dataa) => {
    setIsShowEditBtn(false);
    setInd(dataa.id);
    setChars(dataa.task);
  }

  //Update TodoList after editing
  const updateTask = (e) => {
    e.preventDefault();
    if (chars !== "") {
      myState.val.find((x)=>{
        if(x.id === ind) {
          x.task = chars;
        }
      })
      // dispatch(updateTodo(myState.val));
      // val = chars;
      // todoArray.find((x) => {
      //   if (x.id === ind) {
      //     x.task = val;
      //   }
      // })
      // settodoArray([...todoArray]);
      setIsShowEditBtn(true);
    }
    setChars("");
    setFilterCheck(()=>{
      return true;
    });
  }

  // Filtering Function
  const filteringFunction = (ele) => {
    setChars(ele);
      setChars((x)=>{
       if(x.length>0){
         setFilterCheck(()=>{
          return false;
         });
         setFilterArray(myState.val.filter((a)=> a.task.toLowerCase().includes(x)));
         setFilterArray((y)=>{
           return y;
         });
       }
      else {
        setFilterCheck(()=>{
          return true;
        });
      }

       return x;
      });
  }

  return (
    <div className='mainDiv'>
      <div className='todo-form-div'>
        <h2 className='addNewTaskHeading'>Add New Task</h2>
        <form onSubmit={isShowEditBtn ? handleSubmit : updateTask} className='todo-form'>
          <input type="text" id="todo-form-inputField" className='todo-form-input' placeholder='Task Name' required value={chars}
          onChange={(e)=>{
            filteringFunction(e.target.value);
          }}/>

          {isShowEditBtn ?
            <button type='submit' id="todo-form-submit">
              <i className="fa fa-check"></i>
            </button>
            :
            <button type='submit' id='updateListButton'>Update</button>
          }
        </form>
      </div>
      <div className='todoListDiv'>
        { filterCheck ? 
          myState.val.map((data, ind)=>{
          return (
            <h2 className='todoListShow' key={data.id}>Task {ind + 1} : {data.task}
              <div className='todoButtons'>
                <button className='edit-task-button' onClick={() => editTaskFunc(data)}><i className="fa fa-pencil"></i></button>
                <button className='del-task-button' onClick={() => deleteTaskFunc(data.id)}><i className="fa fa-trash"></i></button>
              </div>
            </h2>
          );
        })
        :
            filterArray.map((data) => {
              return (
                <h2 className='todoListShow' key={data.id}>Task {data.id} : {data.task}
                  <div className='todoButtons'>
                    <button className='edit-task-button' onClick={() => editTaskFunc(data)}><i className="fa fa-pencil"></i></button>
                    <button className='del-task-button' onClick={() => deleteTaskFunc(data.id)}><i className="fa fa-trash"></i></button>
                  </div>
                </h2>
              );
            })
      }
        {/* {
          filterCheck ? 
            todoArray.map((data) => {
              return (
                <h2 className='todoListShow' key={data.id}>Task {data.id} : {data.task}
                  <div className='todoButtons'>
                    <button className='edit-task-button' onClick={() => editTaskFunc(data)}><i className="fa fa-pencil"></i></button>
                    <button className='del-task-button' onClick={() => deleteTaskFunc(data.id)}><i className="fa fa-trash"></i></button>
                  </div>
                </h2>
              );
            })
          :
            filterArray.map((data) => {
              return (
                <h2 className='todoListShow' key={data.id}>Task {data.id} : {data.task}
                  <div className='todoButtons'>
                    <button className='edit-task-button' onClick={() => editTaskFunc(data)}><i className="fa fa-pencil"></i></button>
                    <button className='del-task-button' onClick={() => deleteTaskFunc(data.id)}><i className="fa fa-trash"></i></button>
                  </div>
                </h2>
              );
            })
        } */}
      </div>
    </div>
  )
}

export default Todo;