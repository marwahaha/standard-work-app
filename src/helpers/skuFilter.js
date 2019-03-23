const skuFilter = (selections, allSkus) => {
  const mappedSelections = Object.keys(selections).map(key => selections[key])
  return mappedSelections.reduce(
    (acc, selection) =>
      acc.filter(sku =>
        Object.keys(selection)
          .reduce(
            (acc, categoryId) =>
              acc.filter(
                sku => !selection[categoryId].includes(sku[categoryId])
              ),
            allSkus
          )
          .includes(sku)
      ),
    allSkus
  )
}

export default skuFilter
