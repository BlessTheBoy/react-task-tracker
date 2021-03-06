import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true,
    },
    {
      id: 4,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: false,
    },
    {
      text: "Finish Task Tracker",
      day: "today",
      reminder: true,
      id: 5,
    },
  ]);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const tasksFromData = await fetchTasks();
  //     setTasks(tasksFromData);
  //   };
  //   getTasks();
  // }, []);

  // Fetch tasks from server
  // const fetchTasks = async () => {
  //   const res = await fetch("http://localhost:5000/tasks");
  //   const data = await res.json();

  //   return data;
  // };

  // Fetch task from server
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`);
  //   const data = await res.json();

  //   return data;
  // };

  // Add Task
  const addTask = async (task) => {
    // const res = await fetch("http://localhost:5000/tasks", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(task),
    // });

    // const data = await res.json();

    setTasks([...tasks, task]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    // await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    // const taskToToggle = await fetchTask(id);
    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify({
    //     ...taskToToggle,
    //     reminder: !taskToToggle.reminder,
    //   }),
    // });
    // const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id !== id ? task : { ...task, reminder: !task.reminder }
      )
    );
  };

  return (
    <Router>
      <div className="App container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No task to show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
