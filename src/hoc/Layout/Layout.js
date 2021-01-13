import React, { useState } from 'react'
import { connect } from 'react-redux'
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

function Layout(props) {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerToggleHandler = () => setShowSideDrawer(true)

  const sideDrawerClosedHandler = () => setShowSideDrawer(false)

  return (
    <Aux>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        isOpen={showSideDrawer}
        close={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)