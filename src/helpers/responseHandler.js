export function responseHandler(
  dispatch,
  response,
  successAction,
  errorAction,
  fields
) {
  if (response.ERROR_ARRAY.STATUS === 'OK') {
    const requestTypeResponse = response[response.REQUEST_TYPE]
    dispatch({
      type: successAction,
      ...requestTypeResponse
    })
  } else {
    const errorResponse = response.ERROR_ARRAY
    console.log({
      errorResponse,
      errorAction,
      fields
    })
    dispatch({
      type: errorAction,
      errorMessage: {
        ...errorResponse
      },
      requestData: {
        ...fields
      }
    })
  }
}

// "department_id": "20",
// "department_display_name": "Maintenance",
// "department_class": "production",
// "line_id": "27",
// "line_display_name": "Maintenance",
// "section_id": "49",
// "section_display_name": "Non-Mower Attributes",
// "work_center_id": "174",
// "work_center_display_name": "Test WC-Non-Mower Attr",

// "department_id": "17",
// "department_display_name": "Assembly",
// "department_class": "production",
// "line_id": "19",
// "line_display_name": "Line B",
// "section_id": "23",
// "section_display_name": "Frame",
// "work_center_id": "79",
// "work_center_display_name": "Station 1",
