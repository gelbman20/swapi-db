import React, { Component } from "react";

import './item-details.css';
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ( { item, field, label } ) => {
  return (
    <li className="list-group-item">
      <span className="term"> { label } </span>
      <span> { field } </span>
    </li>
  );
};

export {
  Record
}

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    image: null
  };

  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;

    if ( !itemId ) {
      return null;
    }

    getData( itemId )
      .then( ( item ) => this.setState( {
        item,
        loading: false,
        image: getImageUrl( item )
      } ) );
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.itemId !== prevProps.itemId ) {
      this.setState( { loading: true } );
      this.updateItem();
    }
  }

  render() {
    if ( !this.state.item ) {
      return <span>Select a person from a list</span>
    }

    const { item, image } = this.state;
    const personDetailsView = !this.state.loading ?
      <PersonDetailsView item={ item } image={ image }>
        { this.props.children }
      </PersonDetailsView
      > : null;
    const spinner = this.state.loading ? <Spinner/> : null;

    return (
      <div className="person-details card mb-3">
        { spinner }
        { personDetailsView }
      </div>
    );
  }
};

const PersonDetailsView = ( { item, image, children } ) => {
  const { name } = item;
  return (
    <React.Fragment>
      <img className="person-image"
           alt=''
           src={ image }/>

      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          { children }
        </ul>
        <ErrorButton/>
      </div>
    </React.Fragment>
  );
};