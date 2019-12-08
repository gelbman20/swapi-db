import React, { Component } from "react";

import './app.css'

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

export default class App extends Component {

  state = {
    hasError : false
  };



  componentDidCatch() {
    this.setState( { hasError : true } );
  }

  render() {

    if ( this.state.hasError ) {
      return <ErrorIndicator/>;
    }

    return (
      <div className='stardb-app'>
        <Header/>
        <RandomPlanet/>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
};