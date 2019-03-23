import apiRequest from './apiRequest'
import { responseHandler } from './responseHandler'

export async function networkHandler(
  fields,
  dispatch,
  startedAction,
  successAction,
  errorAction,
  optimisticUpdate
) {
  dispatch({
    type: startedAction,
    fields,
    optimisticUpdate
  })

  const response = await apiRequest({
    ...fields
    // user_id: '1'
  })

  responseHandler(dispatch, response, successAction, errorAction, fields)
}
