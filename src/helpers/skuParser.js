import intersectionBy from 'lodash/intersectionBy'

const skuParser = (selection, skus) => {
  const selectors = Object.keys(selection)
  const result = selectors.reduce((acc, selector) => {
    const notCurr = selectors.reduce((acc, curr) => {
      const selected = selection[curr]
      if (curr === selector || selected.length === 0) {
        return acc
      } else {
        const availableGivenSelected = selected.map(select =>
          skus.filter(sku => select === sku[curr])
        )
        return acc.concat([...availableGivenSelected])
      }
    }, [])
    const flattened = notCurr.length === 0 ? [skus] : notCurr
    const intersected = intersectionBy(...flattened, selector)
    const selectedByAttrib = intersected.map(val => val[selector])
    const available = Array.from(new Set(selectedByAttrib))
    return { ...acc, [selector]: available }
  }, {})
  return result
}

export default skuParser
