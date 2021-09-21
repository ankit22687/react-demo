import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/http-hook';

function App() {

  console.log('in test branch');

  const [tasks, setTasks] = useState([]);

  const transformTasks = taskObj => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTasks);
  }

  const { isLoading, error, sendRequest: fetchTasks } = useHttp({
    url: 'https://react-custom-hook-78d11-default-rtdb.firebaseio.com/tasks.json',
    method: 'GET',
  }, transformTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
