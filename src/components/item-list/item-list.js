import React, { Component } from "react";

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList : null
  };

  updatePeopleList = ( peopleList ) => {
    this.setState( { peopleList } );
  };

  renderItems = ( array ) => {
    return array.map( ( { id, name } ) => {
      return (
        <li className="list-group-item"
            key={ id }
            onClick={ () => this.props.onItemSelected( id ) } >
          { name }
        </li>
      );
    } );
  };

  componentDidMount() {
    this.swapiService
      .getAllPerson()
      .then( this.updatePeopleList );
  }

  render() {

    const { peopleList } = this.state;

    if ( !peopleList ) {
      return <Spinner/>
    }

    const items = this.renderItems( peopleList );

    return (
      <ul className="item-list list-group mb-3">
        { items }
      </ul>
    );
  }
}