import React,{useState} from 'react'
import { FaMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";



function Todo() {
const [darkMode, setDarkMode] = useState('false')
const [filter, setFilter] = useState('all')
const [formData, setFormData] = useState('')
const [tasks, setTasks] = useState([
  {id: 1, todo: 'Wash all dirty cloths',completed: false},
  {id: 2, todo: 'Jog around the park 3x',completed: false},
  {id: 3, todo: '10 minutes meditation',completed: false},
]);


const formSubmission =(e) =>{
    if(e.key === 'Enter' && formData !== '') {
    const newLists = {
      id: Math.floor(Math.random() * 1000),
      todo: formData,
      completed: false
    }
    setTasks(ele => [newLists, ...ele])
    e.preventDefault()
}}

function handleSubmit(e){
  e.preventDefault()
}

function handleCheckbox(taskID){
 const updatedItems = tasks.map((task) => {
    return (
      task.id === taskID ? {...task, completed: !task.completed} : task
    )
  })
  setTasks(updatedItems)
}

const filteredTasks = () => {
  switch (filter) {
    case 'completed':
      return tasks.filter(task => task.completed)
    case 'active':
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
};

const handleFilterChange = (newFilter) => {
  setFilter(newFilter)
}

const handleDeleteCompleted = () => {
  const deletedTasks = tasks.filter(task => !task.completed)
  setTasks(deletedTasks)
}



const tasksDisplay = filteredTasks().map((task) => {
  return (
    <div key={task.id} className={`p-5 shadow-white text-sm ${task.completed && 'line-through text-[#d2d3db]'}`}>
      <label>
        <input 
          type="checkbox" 
          checked={task.completed}
          onChange={() => handleCheckbox(task.id)}
          className={`px-5 mx-3`}
        /> 
        { task.todo }
      </label>
      <hr />
    </div>
  )
})

const handleTheme = () => {
  setDarkMode(theme => !theme)
}


  return (
    <div className={`flex flex-col h-screen w-screen  font-font-josefin ${darkMode && 'dark'}`}>
      <div className=" flex-1 bg-[url('../src/images/bg-desktop-light.jpg')] h-1/2 w-full"></div>
      <div className=" flex-1 bg-white dark:bg-[#393a4c] dark"></div>
      <div className='absolute top-20 left-[25%] w-2/4 '>
        <div className='flex justify-between items-center'>
          <h1 className='text-white font-semibold text-2xl tracking-widest'>TODO</h1>
          <div onClick={handleTheme}>
            {
              darkMode === true ? (<MdOutlineLightMode color='white' size={30}/>) :
                ( <FaMoon color='white' size={20}/>)
            }
          </div>
        </div>
       <form  className='my-5'>
        <input type="text" 
          onSubmit={handleSubmit}
          className='dark:bg-[#4d5066] dark:text-[#cacde8] text-[#9394a5] w-full h-12 rounded px-7'
          placeholder='Create a new todo...'
          onChange={(event) => setFormData(event.target.value)}
          onKeyDown={formSubmission}
          value={formData}
          required
        />     
       </form>
        <div className='dark:bg-[#4d5066] dark:text-[#cacde8] cursor-pointer flex flex-col justify-between bg-white font-semibold text-[#484b6a] w-full overflow-auto h-[250px] rounded shadow shadow-slate-300'>
          <h1>{tasksDisplay}</h1>
        <div className='flex justify-between p-4 text-xs font-semibold'>
          <p className='text-[#9394a5]'>{tasks.length} items left</p>
          <div className=' dark:hover:text-[#e4e5f1] flex font-semibold text-[#9394a5]'>
            <h6 className='hover:text-blue-800' onClick={() => handleFilterChange('all')} >All</h6>
            <h6 className='mx-2 hover:text-blue-800' onClick={() => handleFilterChange('active')}>Active</h6>
            <h6 onClick={() => handleFilterChange('completed')} className='hover:text-blue-800'>Completed</h6>
          </div>
          <div className='font-semibold'>
            <h6 className='mx-2 active:text-red-500 hover:text-blue-800 text-[#9394a5]'onClick={handleDeleteCompleted}>Clear Completed</h6>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default Todo