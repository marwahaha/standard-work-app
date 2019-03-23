const availableJesAttribs = (selection, skuData, attributeType) => {
  return Object.keys(selection)
    .reduce(
      (acc, curr) =>
        selection[curr].length === 0
          ? acc
          : acc.filter(sku => selection[curr].includes(sku[curr])),
      skuData
    )
    .map(val => val[attributeType])
    .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), [])
}

export default availableJesAttribs
