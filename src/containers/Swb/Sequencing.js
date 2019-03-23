import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Branch from '../Branch'
import { connect } from 'react-redux'
import {
  noDestinationDrop,
  branchReOrder,
  elementReOrder,
  elementMove
} from '../../actions'

import isEqual from 'lodash/isEqual'

function BranchList({ branchId, index }) {
  return <Branch key={branchId} branchId={branchId} index={index} />
}

function areEqual(prevProps, nextProps) {
  const propsAreEqual = isEqual(prevProps, nextProps)
  if (propsAreEqual) {
    return true
  }
  return false
}

const PureBranch = React.memo(BranchList, areEqual)

function Sequencing({
  jess,
  branchOrder,
  noDestinationDrop,
  branchReOrder,
  elementMove,
  elementReOrder
}) {
  function routeReorderAction(action) {
    const { destination, source, draggableId, type } = action
    if (
      !destination ||
      (destination.draggableId === source.droppableId &&
        destination.index === source.index)
    ) {
      noDestinationDrop(action)
      return
    }

    if (type === 'BRANCH') {
      const newBranchOrder = Array.from(branchOrder)
      newBranchOrder.splice(source.index, 1)
      newBranchOrder.splice(destination.index, 0, draggableId)
      const fields = {
        data_source: 'standard_work',
        request_type: 'reorder_branches',
        new_branch_seq_asab_id_arr: newBranchOrder
      }
      branchReOrder(fields, newBranchOrder)
      return
    }

    const start = jess[source.droppableId]
    const finish = jess[destination.droppableId]

    if (start === finish) {
      const newElementIds = Array.from(start.elementIds)
      newElementIds.splice(source.index, 1)
      newElementIds.splice(destination.index, 0, draggableId)
      const fields = {
        data_source: 'standard_work',
        request_type: 'reorder_elements',
        new_ele_seq_ajea_id_arr: newElementIds
      }
      const optimisticUpdate = {
        newElementIds: newElementIds,
        jesId: destination.droppableId
      }
      elementReOrder(fields, optimisticUpdate)
      return
    }

    const startElementIds = Array.from(start.elementIds)
    startElementIds.splice(source.index, 1)

    const finishElementIds = Array.from(finish.elementIds)
    finishElementIds.splice(destination.index, 0, draggableId)

    const elementMoveFields = {
      data_source: 'standard_work',
      request_type: 'move_element_diff_jes',
      ajea_id: draggableId,
      destination_abja_id: destination.droppableId,
      source_ele_seq_ajea_id_arr: startElementIds,
      destination_ele_seq_ajea_id_arr: finishElementIds
    }
    const optimisticUpdate = {
      destinationJesId: destination.droppableId,
      sourceJesId: source.droppableId,
      destinationElementSeq: finishElementIds,
      sourceElementSeq: startElementIds
    }
    elementMove(elementMoveFields, optimisticUpdate)
  }

  return (
    <DragDropContext onDragEnd={routeReorderAction}>
      <Droppable droppableId="all-branches" type="BRANCH">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {branchOrder &&
              branchOrder.map((branchId, index) => (
                <PureBranch
                  key={branchId}
                  branchOrder={branchOrder}
                  branchId={branchId}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const mapStateToProps = state => ({
  jess: state.jess,
  branchOrder: state.branchOrder,
  noDestinationDrop: state.noDestinationDrop,
  branchReOrder: state.branchReOrder,
  elementMove: state.elementMove,
  elementReOrder: state.elementReOrder
})

const mapDispatchToProps = dispatch => ({
  noDestinationDrop: action => dispatch(noDestinationDrop(action)),
  branchReOrder: (fields, optimisticUpdate) =>
    dispatch(branchReOrder(fields, optimisticUpdate)),
  elementReOrder: (fields, optimisticUpdate) =>
    dispatch(elementReOrder(fields, optimisticUpdate)),
  elementMove: (fields, optimisticUpdate) =>
    dispatch(elementMove(fields, optimisticUpdate))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequencing)
