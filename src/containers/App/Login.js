import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/styles'
import apiRequest from '../../helpers/apiRequest'
import NavigationPopover from '../../components/NavigationPopover'

import Cookies from 'js-cookie'

export default () => {
  const [userName, setUserName] = useState('')
  const [linkList, setLinkList] = useState([])

  async function getUserData() {
    const initialUserId = Cookies.get('wrightnet_user_token')
    // const initialUserId = Cookies.get('userId')
    // const initialUserId = 'ok266d509vfuidn2cl04awaavob3otwzhiyigrdx'
    if (initialUserId) {
      const refreshData = await apiRequest({
        data_source: 'wrightnet',
        request_type: 'refresh_token_expiration',
        user_token: initialUserId
      })
      if (refreshData.ERROR_ARRAY.STATUS !== 'OK') {
        console.log(refreshData)
        // window.location.replace('https://in.wrightmfg.com/logout.php')
      } else {
        const data =
          refreshData.refresh_token_expiration.user_data_and_permissions
        setLinkList(data.user_menu)
        setUserName(data.first_name + ' ' + data.last_name)
      }
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 15,
      marginLeft: 5
    },
    button: { margin: 10 }
  })
  const classes = useStyles()
  return (
    <>
      {userName ? (
        <NavigationPopover userName={userName}>
          {linkList.map(({ title, url }) => (
            <Button
              key={title}
              style={{ display: 'block', borderRadius: 0 }}
              component={Link}
              href={url}
              size="small"
              target="_blank"
            >
              {title}
            </Button>
          ))}
        </NavigationPopover>
      ) : (
        <Button
          component={Link}
          href={`https://in.wrightmfg.com/login.php?origin=${
            window.location.href
          }`}
          className={classes.button}
          variant="outlined"
          size="small"
        >
          Login
        </Button>
      )}
    </>
  )
}
