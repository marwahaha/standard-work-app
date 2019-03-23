import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import HandleError from './HandleError'
import { fetchLocations, fetchSkus } from '../../actions'
import Navigation from '../Navigation'
import Routes from './Routes'
import TitleBar from '../Navigation/TitleBar'
import { BrowserRouter } from 'react-router-dom'

const App = ({
  pageTitle,
  errorData,
  fetchLocations,
  departments,
  skuData,
  fetchSkus
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 1
    }
  }))

  const classes = useStyles()

  const fetchData = async () => {
    document.title = 'Standard Work'
    await fetchSkus({
      data_source: 'standard_work',
      request_type: 'get_fin_goods_attr_data'
    })
    await fetchLocations({
      data_source: 'standard_work',
      request_type: 'get_navigation_data',
      dept_class_arr: ['production'],
      convert_ids_to_string: 'yes'
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BrowserRouter>
      {skuData && departments && (
        <div className={classes.root}>
          <TitleBar
            handleDrawerToggle={handleDrawerToggle}
            pageTitle={pageTitle}
          />
          <Navigation
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <main className={classes.content}>
            {errorData && <HandleError errorData={errorData} />}
            <Routes />
          </main>
        </div>
      )}
    </BrowserRouter>
  )
}

export default connect(
  state => ({
    pageTitle: state.pageTitle,
    errorData: state.errorData,
    departments: state.departments,
    skuData: state.skuData
  }),
  dispatch => ({
    fetchLocations: fields => dispatch(fetchLocations(fields)),
    fetchSkus: fields => dispatch(fetchSkus(fields))
  })
)(App)
