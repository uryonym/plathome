import * as graph from '@microsoft/microsoft-graph-client'
import { getToken } from './AuthService'
import { Notebook, OnenoteSection, TodoTask, TodoTaskList } from 'microsoft-graph'

const getAuthClient = async () => {
  const token = await getToken()
  return graph.Client.init({
    authProvider: (done) => done(null, token)
  })
}

export const getTaskLists = async (): Promise<TodoTaskList[]> => {
  const client = await getAuthClient()
  const res = await client.api('/me/todo/lists').get()
  return res.value
}

export const getTasks = async (listId: string): Promise<TodoTask[]> => {
  const client = await getAuthClient()
  const res = await client
    .api('/me/todo/lists/' + listId + '/tasks')
    .top(100)
    .get()
  return res.value
}

export const postTask = async (listId: string, todoTask: TodoTask): Promise<TodoTask> => {
  const client = await getAuthClient()
  return await client.api('/me/todo/lists/' + listId + '/tasks').post(todoTask)
}

export const patchTask = async (listId: string, taskId: string, todoTask: TodoTask): Promise<TodoTask> => {
  const client = await getAuthClient()
  return await client.api('/me/todo/lists/' + listId + '/tasks/' + taskId).patch(todoTask)
}

export const deleteTask = async (listId: string, taskId: string) => {
  const client = await getAuthClient()
  await client.api('/me/todo/lists/' + listId + '/tasks/' + taskId).delete()
}

export const getNotebook = async (): Promise<Notebook[]> => {
  const client = await getAuthClient()
  const res = await client
    .api('/me/onenote/notebooks')
    .select('id,displayName')
    .filter("displayName eq 'plathome'")
    .get()
  return res.value
}

export const postNotebook = async (): Promise<Notebook> => {
  const client = await getAuthClient()
  const json = { displayName: 'plathome' }
  return await client.api('/me/onenote/notebooks').post(json)
}

export const getSections = async (noteId: string): Promise<OnenoteSection[]> => {
  const client = await getAuthClient()
  const res = await client
    .api('/me/onenote/notebooks/' + noteId + '/sections')
    .select('id,displayName,createdDateTime')
    .get()
  return res.value
}

export const postSection = async (noteId: string, sectionName: string): Promise<OnenoteSection> => {
  const client = await getAuthClient()
  const json = { displayName: sectionName }
  return await client.api('/me/onenote/notebooks/' + noteId + '/sections').post(json)
}
