import React, { Component } from "react";

import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

  state = {
    itemList : null
  };

  updateItemList = ( itemList ) => {
    this.setState( { itemList } );
  };

  renderItems = ( array ) => {
    return array.map( ( item ) => {
      const { id } = item;
      const label = this.props.children(item);

      return (
        <li className="list-group-item"
            key={ id }
            onClick={ () => this.props.onItemSelected( id ) } >
          { label }
        </li>
      );
    } );
  };

  componentDidMount() {

    const { getData } = this.props;

    getData()
      .then( this.updateItemList );
  }

  render() {

    const { itemList } = this.state;

    if ( !itemList ) {
      return <Spinner/>
    }

    const items = this.renderItems( itemList );

    return (
      <ul className="item-list list-group mb-3">
        { items }
      </ul>
    );
  }
}