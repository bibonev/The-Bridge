import React from "react"
import { render } from "react-dom"

import MainContainer from "./containers/MainContainer"

class Main extends React.Component {
  render() {
    return (
      <MainContainer />
    )
  }
}

render(<Main/>, document.getElementById('react-loader'))
