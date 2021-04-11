import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/rootReducer'
import { AppThunk } from '../../app/store'
import { getTaskLists, getTasks } from '../../lib/GraphService'
import { TodoTask } from 'microsoft-graph'

type TasksState = {
  taskListId: string
  tasks: TodoTask[]
}

const initialState: TasksState = {
  taskListId: '',
  tasks: []
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskListId: (state, action: PayloadAction<string>) => {
      state.taskListId = action.payload
    },
    setTasks: (state, action: PayloadAction<TodoTask[]>) => {
      state.tasks = action.payload
    },
    addTask: (state, action: PayloadAction<TodoTask>) => {
      state.tasks.push(action.payload)
    }
  }
})

export const { setTaskListId, setTasks, addTask } = tasksSlice.actions
export default tasksSlice.reducer

export const selectTasks = (state: RootState) => state.tasks

export const fetchTasks = (): AppThunk => async (dispatch) => {
  try {
    const taskLists = await getTaskLists()
    const taskListId = taskLists[0].id
    if (taskListId) {
      dispatch(setTaskListId(taskListId))
      const tasks = await getTasks(taskListId)
      dispatch(setTasks(tasks))
    }
  } catch (e) {
    console.log(e)
  }
}
