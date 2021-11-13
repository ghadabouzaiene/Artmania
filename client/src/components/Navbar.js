import React from 'react'
import  ReactDOM  from 'react'
import './Navbar.css'

class Sidebar extends React.Component {
    render() {
      return (
        <div className={this.props.expanded ? "sidebar sidebar--expanded" : "sidebar"} onClick={this.props.toggleSidebar} >
          <span className="shape"></span>
          <span className="shape"></span>
          <nav>
            <ul>
              <li><a>login</a></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
  
  class MainContent extends React.Component {
    render() {
      return (
        <section className={this.props.expanded ? "main-content main-content--expanded" : "main-content"}>
          <header>
            <span></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </header>
          <div className="container">
            <div className="module--full">
            </div>
            <div className="module-wrapper">
              <div className="module--half">
              </div>
              <div className="module--half">
              </div>
            </div>
          </div>
        </section>
      )
    }
  }
  
  export class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: false
      }
    }
  
    toggleSidebar() {
      this.setState({
        expanded: !this.state.expanded
      })
    }
  
    render() {
      return (
        <main>
          <Sidebar toggleSidebar={this.toggleSidebar.bind(this)} expanded={this.state.expanded} />
          <MainContent expanded={this.state.expanded} />
        </main>
      );
    }
  }
