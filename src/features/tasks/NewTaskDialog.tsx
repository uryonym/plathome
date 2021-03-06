import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddTask, selectTasks } from './tasksSlice'
import { TodoTask } from 'microsoft-graph'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  TextField
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles({
  fabButton: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    zIndex: 1
  }
})

const NewTaskDialog: React.FC = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [inputTask, setInputTask] = useState('')
  const { taskListId } = useSelector(selectTasks)
  const styles = useStyles()

  const changeInputTask = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value)
  }

  const handleClickAdd = () => {
    setOpen(true)
  }

  const handleClickDialogAdd = () => {
    if (inputTask) {
      const todoTask: TodoTask = {
        title: inputTask
      }
      dispatch(fetchAddTask(taskListId, todoTask))
    }
    setOpen(false)
    setInputTask('')
  }

  return (
    <>
      <Fab className={styles.fabButton} color="secondary" onClick={handleClickAdd}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>タスク追加</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField onChange={changeInputTask} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClickDialogAdd}>
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewTaskDialog
