import React, { Component } from "react";

import './app.css'

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";
import ItemDetails, { Record } from "../item-details";
import Row from "../row";


export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState( { hasError: true } );
  }

  render() {

    if ( this.state.hasError ) {
      return <ErrorIndicator/>;
    }


    const { getPerson, getStarship, getPersonImage, getStarshipImage, getPlanetImage } = this.swapiService;

    const personDetails = (
      <ItemDetails
        getData={ getPerson }
        itemId={ 11 }
        getImageUrl={ getPersonImage }
      >
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        getData={ getStarship }
        itemId={ 10 }
        getImageUrl={ getStarshipImage }>


      </ItemDetails>
    );

    return (
      <div className='stardb-app'>
        <Header/>
        {/*<RandomPlanet/>*/ }
        {/*<PeoplePage/>*/ }
        <Row
          left={ personDetails }
          right={ starshipDetails }
        >
        </Row>
      </div>
    );
  }
};