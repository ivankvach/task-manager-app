import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import TaskList from './TaskList';
import { supabase } from '../supabaseClient';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []);
    }
  };

  const addTask = async () => {
    if (newTaskTitle.trim() === '') return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTaskTitle, completed: false }])
      .select();
    if (error) {
      console.error('Error adding task:', error);
    } else {
      setTasks([...tasks, ...data]);
      setNewTaskTitle('');
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', id)
        .select();
      if (error) {
        console.error('Error toggling task completion:', error);
        console.log(data);
      } else {
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    }
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>
      <TaskList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskManager;
