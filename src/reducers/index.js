import skuParser from '../helpers/skuParser'
// import skuFilter from '../helpers/skuFilter'

// getAll is a function that can be passed instead of skuParser to disable sku checking.
// function getAll(attributeValues) {
//   return Object.keys(attributeValues).reduce((acc, curr) => {
//     return {
//       ...acc,
//       [curr]: Object.keys(attributeValues[curr])
//     }
//   }, {})
// }

const initialSelection = {
  '6': [],
  '1': [],
  '2': [],
  '3': [],
  '4': [],
  '5': []
}

const initialState = {
  errorData: null,
  menuIsOpen: true,
  selection: initialSelection,
  skuData: null,
  availableAttributes: null,
  elements: null,
  jess: null,
  branches: null,
  swbs: null,
  branchOrder: [],
  attributeValues: null,
  attributeCategoryTypes: null,
  tools: null,
  hazards: null,
  departments: null,
  lines: null,
  sections: null,
  workCenters: null,
  workTags: null,
  ctqs: null,
  ctqTypes: null,
  ctqStandards: null,
  colors: null,
  currentDepartment: '17',
  currentLine: null,
  currentSection: null,
  currentWorkCenter: null,
  currentSwb: null,
  pictograms: null,
  pageTitle: [],
  branchesOpen: true,
  openWorkCenters: [],
  workTagTypes: null,
  keyPointsVisable: true,
  ctqsVisable: true,
  workTagsVisable: true
}

const swb = (state = initialState, action) => {
  const { skuData, jess, elements, branches } = state
  switch (action.type) {
    case 'TOGGLE_WORK_TAGS_VISABLE':
      return {
        ...state,
        workTagsVisable: !state.workTagsVisable
      }
    case 'TOGGLE_CRITICAL_TO_QUALITY_VISABLE':
      return {
        ...state,
        ctqsVisable: !state.ctqsVisable
      }
    case 'TOGGLE_KEY_POINTS_VISABLE':
      return {
        ...state,
        keyPointsVisable: !state.keyPointsVisable
      }
    case 'DELETE_WORK_TAG_TYPE_STARTED':
      return {
        ...state
      }
    case 'DELETE_WORK_TAG_TYPE_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedWorkTagType,
        ...remainingWorkTagTypes
      } = state.workTagTypes
      return {
        ...state,
        workTagTypes: {
          ...remainingWorkTagTypes
        }
      }
    case 'DELETE_WORK_TAG_TYPE_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_WORK_TAG_STARTED':
      return {
        ...state
      }
    case 'DELETE_WORK_TAG_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedWorkTag,
        ...remainingWorkTags
      } = state.workTags
      return {
        ...state,
        workTags: {
          ...remainingWorkTags
        }
      }
    case 'DELETE_WORK_TAG_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_CTQ_STANDARD_STARTED':
      return {
        ...state
      }
    case 'DELETE_CTQ_STANDARD_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedCtqStandard,
        ...remainingCtqStandards
      } = state.ctqStandards
      return {
        ...state,
        ctqStandards: {
          ...remainingCtqStandards
        }
      }
    case 'DELETE_CTQ_STANDARD_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_CTQ_TYPE_STARTED':
      return {
        ...state
      }
    case 'DELETE_CTQ_TYPE_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedCtqType,
        ...remainingCtqTypes
      } = state.ctqTypes
      return {
        ...state,
        ctqTypes: {
          ...remainingCtqTypes
        }
      }
    case 'DELETE_CTQ_TYPE_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_CTQ_STARTED':
      return {
        ...state
      }
    case 'DELETE_CTQ_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedCtq,
        ...remainingCtqs
      } = state.ctqs
      return {
        ...state,
        ctqs: {
          ...remainingCtqs
        }
      }
    case 'DELETE_CTQ_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_HAZARD_STARTED':
      return {
        ...state
      }
    case 'DELETE_HAZARD_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedHazard,
        ...remainingHazards
      } = state.hazards
      return {
        ...state,
        hazards: {
          ...remainingHazards
        }
      }
    case 'DELETE_HAZARD_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_TOOL_STARTED':
      return {
        ...state
      }

    case 'DELETE_TOOL_SUCCEEDED':
      const {
        [action.deleted_definition_id]: deletedTool,
        ...remainingTools
      } = state.tools
      return {
        ...state,
        tools: {
          ...remainingTools
        }
      }
    case 'DELETE_TOOL_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_CTQ_STANDARD_STARTED':
      return {
        ...state
      }
    case 'UPDATE_CTQ_STANDARD_SUCCEEDED':
      return {
        ...state,
        ctqStandards: {
          ...state.ctqStandards,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_CTQ_STANDARD_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_CTQ_STANDARD_STARTED':
      return {
        ...state
      }
    case 'CREATE_CTQ_STANDARD_SUCCEEDED':
      return {
        ...state,
        ctqStandards: {
          ...state.ctqStandards,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_CTQ_STANDARD_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_CTQ_STANDARDS_STARTED':
      return {
        ...state
      }
    case 'FETCH_CTQ_STANDARDS_SUCCEEDED':
      return {
        ...state,
        ctqStandards: action.def_data_extended
      }
    case 'FETCH_CTQ_STANDARDS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_CTQ_TYPE_STARTED':
      return {
        ...state
      }
    case 'UPDATE_CTQ_TYPE_SUCCEEDED':
      return {
        ...state,
        ctqTypes: {
          ...state.ctqTypes,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_CTQ_TYPE_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_CTQ_TYPE_STARTED':
      return {
        ...state
      }
    case 'CREATE_CTQ_TYPE_SUCCEEDED':
      return {
        ...state,
        ctqTypes: {
          ...state.ctqTypes,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_CTQ_TYPE_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_CTQ_TYPES_STARTED':
      return {
        ...state
      }
    case 'FETCH_CTQ_TYPES_SUCCEEDED':
      return {
        ...state,
        ctqTypes: action.def_data_extended
      }
    case 'FETCH_CTQ_TYPES_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_WORK_TAG_TYPE_STARTED':
      return {
        ...state
      }
    case 'CREATE_WORK_TAG_TYPE_SUCCEEDED':
      return {
        ...state,
        workTagTypes: {
          ...state.workTagTypes,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_WORK_TAG_TYPE_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_WORK_TAG_TYPE_STARTED':
      return {
        ...state
      }
    case 'UPDATE_WORK_TAG_TYPE_SUCCEEDED':
      return {
        ...state,
        workTagTypes: {
          ...state.workTagTypes,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_WORK_TAG_TYPE_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'UPDATE_CTQ_STARTED':
      return {
        ...state
      }
    case 'UPDATE_CTQ_SUCCEEDED':
      return {
        ...state,
        ctqs: {
          ...state.ctqs,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_CTQ_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'FETCH_CTQS_STARTED':
      return {
        ...state
      }
    case 'FETCH_CTQS_SUCCEEDED':
      return {
        ...state,
        ctqs: action.def_data_extended
      }
    case 'FETCH_CTQS_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'CREATE_CTQ_STARTED':
      return {
        ...state
      }
    case 'CREATE_CTQ_SUCCEEDED':
      return {
        ...state,
        ctqs: {
          ...state.ctqs,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_CTQ_FAILED':
      return {
        ...state
      }

    case 'FETCH_WORK_TAG_TYPES_STARTED':
      return {
        ...state
      }
    case 'FETCH_WORK_TAG_TYPES_SUCCEEDED':
      return {
        ...state,
        workTagTypes: action.def_data_extended
      }
    case 'FETCH_WORK_TAG_TYPES_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_WORK_TAG_STARTED':
      return {
        ...state
      }
    case 'UPDATE_WORK_TAG_SUCCEEDED':
      return {
        ...state,
        workTags: {
          ...state.workTags,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_WORK_TAG_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_WORK_TAG_STARTED':
      return {
        ...state
      }
    case 'CREATE_WORK_TAG_SUCCEEDED':
      return {
        ...state,
        workTags: {
          ...state.workTags,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_WORK_TAG_FAILED':
      return {
        ...state
      }
    case 'UPDATE_HAZARD_STARTED':
      return {
        ...state
      }
    case 'UPDATE_HAZARD_SUCCEEDED':
      return {
        ...state,
        hazards: {
          ...state.hazards,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_HAZARD_FAILED':
      return {
        ...state
      }
    case 'CREATE_HAZARD_STARTED':
      return {
        ...state
      }
    case 'CREATE_HAZARD_SUCCEEDED':
      return {
        ...state,
        hazards: {
          ...state.hazards,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_HAZARD_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_TOOL_STARTED':
      return {
        ...state
      }
    case 'UPDATE_TOOL_SUCCEEDED':
      return {
        ...state,
        tools: {
          ...state.tools,
          [action.id]: {
            ...action
          }
        }
      }
    case 'UPDATE_TOOL_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_TOOL_STARTED':
      return {
        ...state
      }
    case 'CREATE_TOOL_SUCCEEDED':
      return {
        ...state,
        tools: {
          ...state.tools,
          [action.id]: {
            ...action
          }
        }
      }
    case 'CREATE_TOOL_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'TOGGLE_OPEN_WORK_CENTER':
      const openWorkCenters = state.openWorkCenters
      return {
        ...state,
        openWorkCenters: openWorkCenters.includes(action.workCenterId)
          ? openWorkCenters.filter(
              openWorkCenter => openWorkCenter !== action.workCenterId
            )
          : openWorkCenters.concat(action.workCenterId)
      }
    case 'SET_DEPARTMENT':
      return {
        ...state,
        currentDepartment: action.departmentId
      }
    case 'SET_LINE':
      return {
        ...state,
        currentLine: action.lineId
      }
    case 'SET_SECTION':
      return {
        ...state,
        currentSection: action.sectionId
      }
    case 'SET_WORK_CENTER':
      return {
        ...state,
        currentWorkCenter: action.workCenterId
      }
    case 'SET_SWB':
      return {
        ...state,
        currentSwb: action.swbId
      }
    case 'MOVE_BRANCH_STARTED':
      return {
        ...state
      }
    case 'MOVE_BRANCH_SUCCEEDED':
      return {
        ...state
      }
    case 'MOVE_BRANCH_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_KEY_POINT_STARTED':
      return {
        ...state
      }
    case 'CREATE_KEY_POINT_SUCCEEDED':
      const updatedElementKeyPointElement = elements[action.id]
      return {
        ...state,
        elements: {
          ...elements,
          [action.id]: {
            ...updatedElementKeyPointElement,
            keyPoints: action.element.key_points
          }
        }
      }
    case 'CREATE_KEY_POINT_FAILED':
      return {
        ...state
      }
    case 'ADD_PART_TO_ELEMENT_STARTED':
      return {
        ...state
      }
    case 'ADD_PART_TO_ELEMENT_SUCCEEDED':
      const updatedElementPartElement = elements[action.id]
      return {
        ...state,
        elements: {
          ...elements,
          [action.id]: {
            ...updatedElementPartElement,
            parts: action.element.parts_used
          }
        }
      }
    case 'ADD_PART_TO_ELEMENT_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'ADD_MEDIA_TO_ELEMENT':
      const newElementImage = action.fields.add_media_to_element
      const prevElement = elements[newElementImage.id]
      return {
        ...state,
        elements: {
          ...elements,
          [newElementImage.id]: {
            ...prevElement,
            media: newElementImage.element.media
          }
        }
      }
    case 'ADD_MEDIA_TO_ELEMENT_ERROR':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_PICTOGRAMS_STARTED':
      return {
        ...state
      }
    case 'FETCH_PICTOGRAMS_SUCCEEDED':
      return {
        ...state,
        pictograms: action.def_data
      }
    case 'FETCH_PICTOGRAMS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_CRITICAL_POINT_STARTED':
      return {
        ...state
      }
    case 'CREATE_CRITICAL_POINT_SUCCEEDED':
      const updatedElementCriticalPointElement = elements[action.id]
      return {
        ...state,
        elements: {
          ...elements,
          [action.id]: {
            ...updatedElementCriticalPointElement,
            ctqIds: action.element.ctq_ids,
            ctqFreeform: action.element.ctq_freeform
          }
        }
      }
    case 'CREATE_CRITICAL_POINT_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'UPDATE_ELEMENT_WORK_TAG_STARTED':
      return {
        ...state
      }
    case 'UPDATE_ELEMENT_WORK_TAG_SUCCEEDED':
      return {
        ...state,
        elements: {
          ...elements,
          [action.id]: {
            ...elements[action.id],
            workTags: action.element.work_tag_ids
          }
        }
      }

    case 'UPDATE_ELEMENT_WORK_TAG_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_COLORS_STARTED':
      return {
        ...state
      }
    case 'FETCH_COLORS_SUCCEEDED':
      return {
        ...state,
        colors: action.def_data
      }
    case 'FETCH_COLORS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_WORK_TAGS_STARTED':
      return {
        ...state
      }
    case 'FETCH_WORK_TAGS_SUCCEEDED':
      return {
        ...state,
        workTags: action.def_data_extended
      }
    case 'FETCH_WORK_TAGS_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'UPDATE_ELEMENT_HAZARD_STARTED':
      return {
        ...state
      }
    case 'UPDATE_ELEMENT_HAZARD_SUCCEEDED':
      const updatedElementHazardElement = elements[action.id]
      return {
        ...state,

        elements: {
          ...elements,
          [action.id]: {
            ...updatedElementHazardElement,
            hazards: action.element.hazard_ids
          }
        }
      }
    case 'UPDATE_ELEMENT_HAZARD_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_HAZARDS_STARTED':
      return {
        ...state
      }
    case 'FETCH_HAZARDS_SUCCEEDED':
      return {
        ...state,
        hazards: action.def_data_extended
      }
    case 'FETCH_HAZARDS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_TOOLS_STARTED':
      return {
        ...state
      }
    case 'UPDATE_TOOLS_SUCCEEDED':
      const updatedElementToolElement = elements[action.id]
      return {
        ...state,

        elements: {
          ...elements,
          [action.id]: {
            ...updatedElementToolElement,
            tools: action.element.tool_ids
          }
        }
      }
    case 'UPDATE_TOOLS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        errorData: null
      }
    case 'FETCH_LOCATIONS_STARTED':
      return {
        ...state
      }
    case 'FETCH_LOCATIONS_SUCCEEDED':
      return {
        ...state,
        departments: action.departments,
        lines: action.lines,
        sections: action.sections,
        workCenters: action.work_centers,
        swbs: action.swbs
      }
    case 'FETCH_LOCATIONS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_SWB_STARTED':
      return {
        ...state
      }
    case 'UPDATE_SWB_SUCCEEDED':
      return {
        ...state,
        swbs: {
          ...state.swbs,
          [action.asam_id]: {
            mower_attributes: action.swb.attributes,
            parts: action.swb.parts,
            description: action.swb.description
          }
        }
      }
    case 'UPDATE_SWB_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'INITIALIZE_SWB_PICKER_SELECTION':
      const avil = skuParser(action.attributes, skuData)
      return {
        ...state,
        availableAttributes: avil,
        selection: action.attributes
        // availableAttributes: getAll(state.attributeValues)
      }
    case 'CLEAR_SWB_PICKER_SELECTION':
      return {
        ...state,
        // availableAttributes: getAll(state.attributeValues),
        availableAttributes: skuParser(initialSelection, skuData),
        selection: initialSelection
      }
    case 'DELETE_JES_STARTED':
      return {
        ...state
      }
    case 'DELETE_JES_SUCCEEDED':
      const { [action.affected_abja_id]: deletedJes, ...remainingJes } = jess
      const updatedJesOrderBranch = branches[action.asab_id]
      return {
        ...state,
        jess: {
          ...remainingJes
        },
        branches: {
          ...branches,
          [action.asab_id]: {
            ...updatedJesOrderBranch,
            jesIds: updatedJesOrderBranch.jesIds.filter(
              x => x !== action.affected_abja_id
            )
          }
        }
      }
    case 'DELETE_JES_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'DELETE_SWB_STARTED':
      return {
        ...state
      }
    case 'DELETE_SWB_SUCCEEDED':
      const { [action.asam_id]: DELETED_SWB, ...remainingSwbs } = state.swbs
      const wcObjToDeleteFrom = state.workCenters[action.work_center_id]
      return {
        ...state,
        swbs: remainingSwbs,
        workCenters: {
          ...state.workCenters,
          [action.work_center_id]: {
            ...wcObjToDeleteFrom,
            swbs_asam_ids: wcObjToDeleteFrom.swbs_asam_ids.filter(
              swbId => swbId !== action.asam_id
            )
          }
        }
      }
    case 'DELETE_SWB_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_JES_STARTED':
      return {
        ...state
      }

    case 'CREATE_JES_SUCCEEDED':
      const updatedBranchNewJes = branches[action.asab_id]
      const newJesAtttributeCategory = Object.keys(action.attributes)
      return {
        ...state,

        jess: {
          ...jess,
          [action.id]: {
            id: action.id,
            attributes: action.attributes[newJesAtttributeCategory],
            elementIds: []
          }
        },
        branches: {
          ...branches,
          [action.asab_id]: {
            ...updatedBranchNewJes,
            jesIds: updatedBranchNewJes.jesIds.concat(action.id)
          }
        }
      }
    case 'CREATE_JES_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuIsOpen: !state.menuIsOpen
      }
    // case 'FETCH_SWBS_STARTED':
    //   return {
    //     ...state
    //   }
    // case 'FETCH_SWBS_SUCCEEDED':
    //   if (action.swbs_asam_ids) {

    //     return {
    //       ...state,
    //       pageTitle: [
    //         action.department_display_name,
    //         action.line_display_name,
    //         action.section_display_name,
    //         action.work_center_display_name
    //       ],
    //       branchesOpen: false,
    //       currentDepartment: action.department_id,
    //       currentLine: action.line_id,
    //       currentSection: action.section_id,
    //       // currentWorkCenter: action.work_center_id, Don's set because nav arrows should not toggle on workcenter page load
    //       standardWorkBooks: action.swbs_asam_ids,
    //       // availableAttributes: getAll(state.attributeValues)
    //       availableAttributes: skuParser(state.selection, skuData)
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       workCenterAttributes: [],
    //       standardWorkBooks: null
    //     }
    //   }

    // case 'FETCH_SWBS_FAILED':
    //   return {
    //     ...state,
    //     errorData: action
    //   }
    case 'CREATE_ELEMENT_STARTED':
      return {
        ...state
      }
    case 'CREATE_ELEMENT_SUCCEEDED':
      const newId = action.id
      const jesId = action.abja_id
      return {
        errorData: action,
        ...state,

        elements: {
          ...elements,
          [newId]: {
            id: newId,
            title: action.element.desc,
            time: action.element.value_added_time,
            tools: [],
            hazards: [],
            workTags: [],
            parts: [],
            ctqFreeform: [],
            ctqIds: [],
            keyPoints: []
          }
        },
        jess: {
          ...jess,
          [jesId]: {
            ...jess[jesId],
            elementIds: jess[jesId].elementIds.concat(newId)
          }
        }
      }
    case 'CREATE_ELEMENT_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_ELEMENT_STARTED':
      return {
        ...state
      }
    case 'UPDATE_ELEMENT_SUCCEEDED':
      const updatedElement = elements[action.id]
      return {
        ...state,

        elements: {
          ...elements,
          [action.id]: {
            ...updatedElement,
            title: action.element.desc,
            time: action.element.value_added_time
          }
        }
      }

    case 'UPDATE_ELEMENT_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'ELEMENT_MOVE_STARTED':
      const optimisticUpdate = action.optimisticUpdate
      const {
        sourceJesId,
        destinationJesId,
        destinationElementSeq,
        sourceElementSeq
      } = optimisticUpdate
      const newSourceJes = jess[sourceJesId]
      const newDestinationJes = jess[destinationJesId]
      return {
        ...state,
        jess: {
          ...jess,
          [sourceJesId]: {
            ...newSourceJes,
            elementIds: sourceElementSeq
          },
          [destinationJesId]: {
            ...newDestinationJes,
            elementIds: destinationElementSeq
          }
        }
      }
    case 'ELEMENT_MOVE_SUCCEEDED':
      const { source_jess_abja_id, destination_jess_abja_id } = action
      const sourceJes = jess[source_jess_abja_id.abja_id]
      const sourceJesNewSeq = source_jess_abja_id.element_seq_ajea_ids
      const destinationJes = jess[destination_jess_abja_id.abja_id]
      const destinationJesNewSeq = destination_jess_abja_id.element_seq_ajea_ids
      return {
        ...state,
        jess: {
          ...state.jess,
          [source_jess_abja_id.abja_id]: {
            ...sourceJes,
            elementIds: sourceJesNewSeq
          },
          [destination_jess_abja_id.abja_id]: {
            ...destinationJes,
            elementIds: destinationJesNewSeq
          }
        }
      }
    case 'ELEMENT_MOVE_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'TOGGLE_BRANCH_EXPAND':
      const toggledBranch = branches[action.branchId]
      return {
        ...state,
        branches: {
          ...branches,
          [action.branchId]: {
            ...toggledBranch,
            expandOpen: !toggledBranch.expandOpen
          }
        }
      }
    case 'TOGGLE_ALL_BRANCHES':
      return {
        ...state,
        branchesOpen: !state.branchesOpen,
        branches: Object.keys(state.branches).reduce((acc, curr) => {
          const oldBranch = branches[curr]
          return {
            ...acc,
            [curr]: {
              ...oldBranch,
              expandOpen: !state.branchesOpen
            }
          }
        }, {})
      }
    case 'DELETE_ELEMENT_STARTED':
      return {
        ...state
      }
    case 'DELETE_ELEMENT_SUCCEEDED':
      const deletedElementId = action.ajea_id
      const parentJesId = action.abja_id
      const newJes = jess[parentJesId]
      const newIds = newJes.elementIds.filter(
        eleId => eleId !== deletedElementId
      )
      const { [deletedElementId]: _, ...remainingIds } = elements

      return {
        ...state,

        elements: remainingIds,
        jess: {
          ...jess,
          [parentJesId]: {
            ...newJes,
            elementIds: newIds
          }
        }
      }
    case 'DELETE_ELEMENT_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'NO_DESTINATION_DROP':
      return state
    case 'BRANCH_REORDER_STARTED':
      return {
        ...state,
        branchOrder: action.optimisticUpdate
      }
    case 'BRANCH_REORDER_SUCCEEDED':
      return {
        ...state,

        branchOrder: action.branch_seq_asab_ids
      }
    case 'BRANCH_REORDER_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'ELEMENT_REORDER_STARTED':
      const optimisticJes = jess[action.optimisticUpdate.jesId]
      return {
        ...state,
        jess: {
          ...jess,
          [action.optimisticUpdate.jesId]: {
            ...optimisticJes,
            elementIds: action.optimisticUpdate.newElementIds
          }
        }
      }
    case 'ELEMENT_REORDER_SUCCEEDED':
      const reorderedJesId = action.abja_id
      const reorderedJes = jess[reorderedJesId]
      return {
        ...state,

        jess: {
          ...jess,
          [reorderedJesId]: {
            ...reorderedJes,
            elementIds: action.element_seq_ajea_ids
          }
        }
      }
    case 'ELEMENT_REORDER_FAILED':
      return {
        ...state,
        errorData: action
      }

    case 'DELETE_BRANCH_STARTED':
      return {
        ...state
      }
    case 'DELETE_BRANCH_SUCCEEDED':
      const {
        [action.asab_id]: deletedBranch,
        ...remainingBranches
      } = state.branches

      return {
        ...state,

        branches: remainingBranches,
        branchOrder: state.branchOrder.filter(
          branch => branch !== action.asab_id
        )
      }
    case 'DELETE_BRANCH_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'CREATE_BRANCH_STARTED':
      return {
        ...state
      }
    case 'CREATE_BRANCH_SUCCEEDED':
      const newBranch = action.branches_asab_id
      const newJesInBranch = action.jess_abja_id
      const newJesAttributeCategory = Object.keys(newJesInBranch.jes.attributes)
      return {
        ...state,

        branchOrder: state.branchOrder.concat(newBranch.id),
        branches: {
          ...branches,
          [newBranch.id]: {
            id: newBranch.id,
            title: newBranch.branch.desc,
            expandOpen: true,
            jesIds: [newJesInBranch.id],
            attributeType: newBranch.branch.attribute_type.id
          }
        },
        jess: {
          ...jess,
          [newJesInBranch.id]: {
            id: newJesInBranch.id,
            attributes: newJesInBranch.jes.attributes[newJesAttributeCategory],
            elementIds: []
          }
        }
      }
    case 'CREATE_BRANCH_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'UPDATE_BRANCH_STARTED':
      return {
        ...state
      }
    case 'UPDATE_BRANCH_SUCCEEDED':
      const updatedBranchId = action.branches_asab_id.id
      const updatedBranchTitle = action.branches_asab_id.branch.desc
      const updatedBranch = state.branches[updatedBranchId]
      return {
        ...state,
        branches: {
          ...branches,
          [updatedBranchId]: {
            ...updatedBranch,
            title: updatedBranchTitle
          }
        }
      }
    case 'UPDATE_BRANCH_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_SKUS_STARTED':
      return {
        ...state
      }
    case 'FETCH_SKUS_SUCCEEDED':
      return {
        ...state,
        skuData: action.items,
        attributeValues: action.item_definitions,
        attributeCategoryTypes: action.attribute_types,
        // availableAttributes: getAll(action.item_definitions)
        availableAttributes: skuParser(state.selection, action.items)
      }
    case 'FETCH_SKUS_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_SWB_STARTED':
      return {
        ...state
      }
    case 'FETCH_SWB_SUCCEEDED':
      const {
        elements_abja_ids,
        jess_abja_ids,
        branches_asab_ids,
        branch_seq_asab_ids,
        swbs_asam_id
      } = action
      const singleSwbAttribs = swbs_asam_id.swb.attributes
      function returnAttribs() {
        if (singleSwbAttribs) {
          return Object.keys(singleSwbAttribs).reduce((acc, curr) => {
            return {
              ...acc,
              [curr]: singleSwbAttribs[curr] ? singleSwbAttribs[curr] : []
            }
          }, singleSwbAttribs)
        } else {
          return state.selection
        }
      }

      return {
        ...state,
        pageTitle: [
          action.department_display_name,
          action.line_display_name,
          action.section_display_name,
          action.work_center_display_name
        ],
        workTags: action.all_work_tags,
        tools: action.all_tools,
        hazards: action.all_hazards,
        pictograms: action.all_pictograms,
        colors: action.all_colors,
        selection: returnAttribs(),
        currentDepartment: action.department_id,
        currentLine: action.line_id,
        currentSection: action.section_id,
        currentWorkCenter: action.work_center_id,
        currentSwb: swbs_asam_id,
        allCtqs: action.all_ctqs,
        allCtqStandards: action.all_ctq_standards,
        allCtqTypeRelations: action.all_ctq_type_relations,
        allCtqTypes: action.all_ctq_types,
        elements: Object.keys(elements_abja_ids).reduce((acc, curr) => {
          return {
            ...acc,
            [curr]: {
              id: elements_abja_ids[curr].id,
              title: elements_abja_ids[curr].element.desc,
              time: elements_abja_ids[curr].element.value_added_time,
              tools: elements_abja_ids[curr].element.tool_ids,
              hazards: elements_abja_ids[curr].element.hazard_ids,
              workTags: elements_abja_ids[curr].element.work_tag_ids,
              media: elements_abja_ids[curr].element.media,
              parts: elements_abja_ids[curr].element.parts_used,
              ctqFreeform: elements_abja_ids[curr].element.ctq_freeform,
              ctqIds: elements_abja_ids[curr].element.ctq_ids,
              keyPoints: elements_abja_ids[curr].element.key_points
            }
          }
        }, {}),
        jess: Object.keys(jess_abja_ids).reduce((acc, curr) => {
          const attribCate = Object.keys(jess_abja_ids[curr].jes.attributes)
          return {
            ...acc,
            [curr]: {
              id: jess_abja_ids[curr].id,
              attributes: jess_abja_ids[curr].jes.attributes[attribCate],
              elementIds: jess_abja_ids[curr].jes.element_seq_ajea_ids
            }
          }
        }, {}),
        branches: Object.keys(branches_asab_ids).reduce((acc, curr) => {
          return {
            ...acc,
            [curr]: {
              expandOpen: state.branchesOpen,
              id: branches_asab_ids[curr].id,
              attributeType: branches_asab_ids[curr].branch.attribute_type.id,
              jesIds: branches_asab_ids[curr].branch.jes_seq_abja_ids,
              title: branches_asab_ids[curr].branch.desc
            }
          }
        }, {}),
        branchOrder: branch_seq_asab_ids
      }
    case 'FETCH_SWB_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'TOGGLE_ATTRIBUTE':
      // actions: workCenterId, selector, setting

      const selected = state.selection[action.selector]
      const removedAttributeSelection = {
        ...state.selection,
        [action.selector]: selected.includes(action.setting)
          ? selected.filter(prev => prev !== action.setting)
          : selected.concat(action.setting)
      }

      // logic for cross-swb checking
      // const currentSwbIds = state.workCenters[action.workCenterId].swbs_asam_ids
      // const currentSwbs = currentSwbIds.map(swbId => state.swbs[swbId])
      // const filteredSkus = skuFilter(currentSwbs, skuData)

      return {
        ...state,
        // availableAttributes: getAll(state.attributeValues),
        availableAttributes: skuParser(removedAttributeSelection, skuData),
        selection: removedAttributeSelection
      }
    case 'CREATE_SWB_STARTED':
      return {
        ...state
      }
    case 'CREATE_SWB_SUCCEEDED':
      const updatedWorkCenter = state.workCenters[action.work_center_id]
      return {
        ...state,
        swbs: {
          ...state.swbs,
          [action.asam_id]: {
            mower_attributes: action.swb.attributes,
            parts: action.swb.parts,
            description: action.swb.description
          }
        },
        workCenters: {
          ...state.workCenters,
          [action.work_center_id]: {
            ...updatedWorkCenter,
            swbs_asam_ids: updatedWorkCenter.swbs_asam_ids.concat(
              action.asam_id
            )
          }
        }
      }
    case 'CREATE_SWB_FAILED':
      return {
        ...state,
        errorData: action
      }
    case 'FETCH_TOOLS_STARTED':
      return {
        ...state
      }
    case 'FETCH_TOOLS_SUCCEEDED':
      return {
        ...state,
        tools: action.def_data_extended
      }
    case 'FETCH_TOOLS_FAILED':
      return {
        ...state,
        errorData: action
      }
    default:
      return state
  }
}

export default swb
