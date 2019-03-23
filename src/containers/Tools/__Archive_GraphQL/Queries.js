import gql from 'graphql-tag'

const GET_TOOLS = gql`
  {
    tools {
      id
      name
      active
      pictogram {
        id
        url
        name
      }
    }
  }
`

export { GET_TOOLS }
