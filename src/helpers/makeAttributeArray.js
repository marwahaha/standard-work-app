export function makeAttributeArray(swb, attributeValues) {
  let result = []

  if (swb.mower_attributes) {
    const attributes = swb.mower_attributes
    const order = ['6', '1', '2', '3', '4', '5']
    const mowerAttributes = order.reduce((strArr, attribCategory) => {
      if (attributes[attribCategory].length > 0) {
        return strArr.concat(
          attributes[attribCategory].map(
            attribId => attributeValues[attribCategory][attribId]
          )
        )
      } else {
        return strArr
      }
    }, [])
    if (mowerAttributes.length > 0) {
      result.push(...mowerAttributes)
    }
  }
  if (swb.parts) {
    result.push(...swb.parts)
  }
  if (swb.description) {
    result.push(swb.description)
  }

  if (result.length > 0) {
    return result
  } else {
    return ['No SWB Attribute Type']
  }
}
