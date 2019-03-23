import { networkHandler } from '../helpers/networkHandler'

export const deleteWorkTagType = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_WORK_TAG_TYPE_STARTED',
    'DELETE_WORK_TAG_TYPE_SUCCEEDED',
    'DELETE_WORK_TAG_TYPE_FAILED'
  )

export const deleteWorkTag = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_WORK_TAG_STARTED',
    'DELETE_WORK_TAG_SUCCEEDED',
    'DELETE_WORK_TAG_FAILED'
  )

export const deleteCtqStandard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_CTQ_STANDARD_STARTED',
    'DELETE_CTQ_STANDARD_SUCCEEDED',
    'DELETE_CTQ_STANDARD_FAILED'
  )

export const deleteCtqType = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_CTQ_TYPE_STARTED',
    'DELETE_CTQ_TYPE_SUCCEEDED',
    'DELETE_CTQ_TYPE_FAILED'
  )

export const deleteCtq = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_CTQ_STARTED',
    'DELETE_CTQ_SUCCEEDED',
    'DELETE_CTQ_FAILED'
  )

export const deleteHazard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_HAZARD_STARTED',
    'DELETE_HAZARD_SUCCEEDED',
    'DELETE_HAZARD_FAILED'
  )

export const deleteTool = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_TOOL_STARTED',
    'DELETE_TOOL_SUCCEEDED',
    'DELETE_TOOL_FAILED'
  )

export const updateCtqStandard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_CTQ_STANDARD_STARTED',
    'UPDATE_CTQ_STANDARD_SUCCEEDED',
    'UPDATE_CTQ_STANDARD_FAILED'
  )

export const createCtqStandard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_CTQ_STANDARD_STARTED',
    'CREATE_CTQ_STANDARD_SUCCEEDED',
    'CREATE_CTQ_STANDARD_FAILED'
  )

export const fetchCtqStandards = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_CTQ_STANDARDS_STARTED',
    'FETCH_CTQ_STANDARDS_SUCCEEDED',
    'FETCH_CTQ_STANDARDS_FAILED'
  )

export const updateCtqType = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_CTQ_TYPE_STARTED',
    'UPDATE_CTQ_TYPE_SUCCEEDED',
    'UPDATE_CTQ_TYPE_FAILED'
  )

export const createCtqType = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_CTQ_TYPE_STARTED',
    'CREATE_CTQ_TYPE_SUCCEEDED',
    'CREATE_CTQ_TYPE_FAILED'
  )

export const fetchCtqTypes = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_CTQ_TYPES_STARTED',
    'FETCH_CTQ_TYPES_SUCCEEDED',
    'FETCH_CTQ_TYPES_FAILED'
  )

export const createWorkTagType = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_WORK_TAG_TYPE_STARTED',
    'CREATE_WORK_TAG_TYPE_SUCCEEDED',
    'CREATE_WORK_TAG_TYPE_FAILED'
  )

export const updateWorkTagType = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_WORK_TAG_TYPE_STARTED',
    'UPDATE_WORK_TAG_TYPE_SUCCEEDED',
    'UPDATE_WORK_TAG_TYPE_FAILED'
  )

export const updateCtq = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_CTQ_STARTED',
    'UPDATE_CTQ_SUCCEEDED',
    'UPDATE_CTQ_FAILED'
  )

export const fetchCtqs = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_CTQS_STARTED',
    'FETCH_CTQS_SUCCEEDED',
    'FETCH_CTQS_FAILED'
  )

export const createCtq = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_CTQ_STARTED',
    'CREATE_CTQ_SUCCEEDED',
    'CREATE_CTQ_FAILED'
  )

export const fetchWorkTagTypes = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_WORK_TAG_TYPES_STARTED',
    'FETCH_WORK_TAG_TYPES_SUCCEEDED',
    'FETCH_WORK_TAG_TYPES_FAILED'
  )

export const updateWorkTag = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_WORK_TAG_STARTED',
    'UPDATE_WORK_TAG_SUCCEEDED',
    'UPDATE_WORK_TAG_FAILED'
  )

export const createWorkTag = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_WORK_TAG_STARTED',
    'CREATE_WORK_TAG_SUCCEEDED',
    'CREATE_WORK_TAG_FAILED'
  )

export const updateHazard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_HAZARD_STARTED',
    'UPDATE_HAZARD_SUCCEEDED',
    'UPDATE_HAZARD_FAILED'
  )

export const updateElementHazard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_ELEMENT_HAZARD_STARTED',
    'UPDATE_ELEMENT_HAZARD_SUCCEEDED',
    'UPDATE_ELEMENT_HAZARD_FAILED'
  )

export const createHazard = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_HAZARD_STARTED',
    'CREATE_HAZARD_SUCCEEDED',
    'CREATE_HAZARD_FAILED'
  )

export const addMediaToElementError = fields => ({
  type: 'ADD_MEDIA_TO_ELEMENT_ERROR',
  fields
})

export const addMediaToElement = fields => ({
  type: 'ADD_MEDIA_TO_ELEMENT',
  fields
})

export const toggleOpenWorkCenter = workCenterId => ({
  type: 'TOGGLE_OPEN_WORK_CENTER',
  workCenterId
})

export const setDepartment = departmentId => ({
  type: 'SET_DEPARTMENT',
  departmentId
})

export const setLine = lineId => ({
  type: 'SET_LINE',
  lineId
})

export const setSection = sectionId => ({
  type: 'SET_SECTION',
  sectionId
})

export const setWorkCenter = workCenterId => ({
  type: 'SET_WORK_CENTER',
  workCenterId
})

export const setSwb = swbId => ({
  type: 'SET_SWB',
  swbId
})

export const updateTool = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_TOOL_STARTED',
    'UPDATE_TOOL_SUCCEEDED',
    'UPDATE_TOOL_FAILED'
  )

export const createTool = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_TOOL_STARTED',
    'CREATE_TOOL_SUCCEEDED',
    'CREATE_TOOL_FAILED'
  )

export const moveBranch = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'MOVE_BRANCH_STARTED',
    'MOVE_BRANCH_SUCCEEDED',
    'MOVE_BRANCH_FAILED'
  )

export const createKeyPoint = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_KEY_POINT_STARTED',
    'CREATE_KEY_POINT_SUCCEEDED',
    'CREATE_KEY_POINT_FAILED'
  )

export const addPartToElement = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'ADD_PART_TO_ELEMENT_STARTED',
    'ADD_PART_TO_ELEMENT_SUCCEEDED',
    'ADD_PART_TO_ELEMENT_FAILED'
  )

export const fetchPictograms = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_PCTOGRAMS_STARTED',
    'FETCH_PICTOGRAMS_SUCCEEDED',
    'FETCH_PICTOGRAMS_FAILED'
  )

export const createCriticalPoint = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_CRITICAL_POINT_STARTED',
    'CREATE_CRITICAL_POINT_SUCCEEDED',
    'CREATE_CRITICAL_POINT_FAILED'
  )
export const updateElementWorkTag = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_ELEMENT_WORK_TAG_STARTED',
    'UPDATE_ELEMENT_WORK_TAG_SUCCEEDED',
    'UPDATE_ELEMENT_WORK_TAG_FAILED'
  )
export const fetchColors = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_COLORS_STARTED',
    'FETCH_COLORS_SUCCEEDED',
    'FETCH_COLORS_FAILED'
  )

export const fetchWorkTags = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_WORK_TAGS_STARTED',
    'FETCH_WORK_TAGS_SUCCEEDED',
    'FETCH_WORK_TAGS_FAILED'
  )
export const updateTools = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_TOOLS_STARTED',
    'UPDATE_TOOLS_SUCCEEDED',
    'UPDATE_TOOLS_FAILED'
  )

export const fetchHazards = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_HAZARDS_STARTED',
    'FETCH_HAZARDS_SUCCEEDED',
    'FETCH_HAZARDS_FAILED'
  )

export const updateSwb = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_SWB_STARTED',
    'UPDATE_SWB_SUCCEEDED',
    'UPDATE_SWB_FAILED'
  )

export const addElement = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_ELEMENT_STARTED',
    'CREATE_ELEMENT_SUCCEEDED',
    'CREATE_ELEMENT_FAILED'
  )

export const deleteElement = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_ELEMENT_STARTED',
    'DELETE_ELEMENT_SUCCEEDED',
    'DELETE_ELEMENT_FAILED'
  )

export const deleteJes = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_JES_STARTED',
    'DELETE_JES_SUCCEEDED',
    'DELETE_JES_FAILED'
  )

export const deleteSwb = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_SWB_STARTED',
    'DELETE_SWB_SUCCEEDED',
    'DELETE_SWB_FAILED'
  )

export const updateElement = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_ELEMENT_STARTED',
    'UPDATE_ELEMENT_SUCCEEDED',
    'UPDATE_ELEMENT_FAILED'
  )

export const fetchSwb = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_SWB_STARTED',
    'FETCH_SWB_SUCCEEDED',
    'FETCH_SWB_FAILED'
  )

export const fetchSwbs = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_SWBS_STARTED',
    'FETCH_SWBS_SUCCEEDED',
    'FETCH_SWBS_FAILED'
  )

export const fetchSkus = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_SKUS_STARTED',
    'FETCH_SKUS_SUCCEEDED',
    'FETCH_SKUS_FAILED'
  )

export const elementMove = (fields, optimisticUpdate) => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'ELEMENT_MOVE_STARTED',
    'ELEMENT_MOVE_SUCCEEDED',
    'ELEMENT_MOVE_FAILED',
    optimisticUpdate
  )

export const elementReOrder = (fields, optimisticUpdate) => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'ELEMENT_REORDER_STARTED',
    'ELEMENT_REORDER_SUCCEEDED',
    'ELEMENT_REORDER_FAILED',
    optimisticUpdate
  )

export const branchReOrder = (fields, optimisticUpdate) => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'BRANCH_REORDER_STARTED',
    'BRANCH_REORDER_SUCCEEDED',
    'BRANCH_REORDER_FAILED',
    optimisticUpdate
  )

export const createBranch = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_BRANCH_STARTED',
    'CREATE_BRANCH_SUCCEEDED',
    'CREATE_BRANCH_FAILED'
  )

export const deleteBranch = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'DELETE_BRANCH_STARTED',
    'DELETE_BRANCH_SUCCEEDED',
    'DELETE_BRANCH_FAILED'
  )

export const updateBranch = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'UPDATE_BRANCH_STARTED',
    'UPDATE_BRANCH_SUCCEEDED',
    'UPDATE_BRANCH_FAILED'
  )

export const createJes = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_JES_STARTED',
    'CREATE_JES_SUCCEEDED',
    'CREATE_JES_FAILED'
  )

export const createSwb = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'CREATE_SWB_STARTED',
    'CREATE_SWB_SUCCEEDED',
    'CREATE_SWB_FAILED'
  )

export const toggleMenu = () => ({
  type: 'TOGGLE_MENU'
})

export const setUserId = userId => ({
  type: 'SET_USER_ID',
  userId
})

export const toggleLighting = () => ({
  type: 'TOGGLE_LIGHTING'
})

export const clearError = () => ({
  type: 'CLEAR_ERROR'
})

export const toggleBranchExpand = branchId => ({
  type: 'TOGGLE_BRANCH_EXPAND',
  branchId
})

export const toggleAllBranches = isOpen => ({
  type: 'TOGGLE_ALL_BRANCHES',
  isOpen
})

export const noDestinationDrop = result => ({
  type: 'NO_DESTINATION_DROP',
  result
})

export const addSwb = (id, selection) => ({
  type: 'ADD_SWB',
  id,
  selection
})

export const toggleAttribute = (selector, setting, workCenterId) => ({
  type: 'TOGGLE_ATTRIBUTE',
  selector,
  setting,
  workCenterId
})

export const clearSwbPickerSelection = () => ({
  type: 'CLEAR_SWB_PICKER_SELECTION'
})

export const initializeSwbPickerSelection = attributes => ({
  type: 'INITIALIZE_SWB_PICKER_SELECTION',
  attributes
})

export const fetchTools = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_TOOLS_STARTED',
    'FETCH_TOOLS_SUCCEEDED',
    'FETCH_TOOLS_FAILED'
  )

export const fetchLocations = fields => async dispatch =>
  networkHandler(
    fields,
    dispatch,
    'FETCH_LOCATIONS_STARTED',
    'FETCH_LOCATIONS_SUCCEEDED',
    'FETCH_LOCATIONS_FAILED'
  )
