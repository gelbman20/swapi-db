export default class SwapiService {

  _apiBase = 'https://swapi.co/api/';
  _imgBase = 'https://starwars-visualguide.com/assets/img/';

  async getResources( url ) {
    const res = await fetch( `${ this._apiBase }${ url }` );

    if ( !res.ok ) {
      throw new Error( `Status ${ res.status }` );
    }

    return await res.json();
  }

  getAllPerson = async () => {
    const res = await this.getResources( 'people/' );
    return res.results.map( this._transformPerson );
  };

  getPerson = async ( id ) => {
    const person = await this.getResources( `people/${ id }` );
    return this._transformPerson( person );
  };

  getAllPlanet = async () => {
    const res = await this.getResources( 'planets/' );
    return res.results.map( this._transformPlanet );
  };

  getPlanet = async ( id ) => {
    const planet = await this.getResources( `planets/${ id }` );
    return this._transformPlanet( planet );
  };

  getAllStarships = async () => {
    const res = await this.getResources( `starships/` );
    return res.results.map( this._transformStarship );
  };

  getStarship = async ( id ) => {
    const starship =  await this.getResources( `starships/${ id }` );
    return this._transformStarship(starship);
  };

  getPersonImage = ({id}) => {
    return `${this._imgBase}characters/${id}.jpg`
  };

  getStarshipImage = ({id}) => {
    return `${this._imgBase}starships/${id}.jpg`
  };

  getPlanetImage = ({id}) => {
    return `${this._imgBase}planets/${id}.jpg`
  };

  _extractId = ( item ) => {
    const idRexExp = /([0-9]*)\/$/;
    return item.match( idRexExp )[ 1 ];
  };

  _transformPlanet = ( planet ) => {
    return {
      id : this._extractId( planet.url ),
      name : planet.name,
      population : planet.population,
      rotationPeriod : planet.rotation_period,
      diameter : planet.diameter
    }
  }

  _transformStarship = ( starship ) => {
    return {
      id : this._extractId( starship.url ),
      name : starship.name,
      model : starship.model,
      manufacturer : starship.manufacturer,
      costInCredits : starship.cost_in_credits,
      length : starship.length,
      crew : starship.crew,
      passengers : starship.passengers,
      cargoCapacity : starship.cargo_capacity
    }
  }

  _transformPerson = ( person ) => {
    return {
      id : this._extractId( person.url ),
      name : person.name,
      gender : person.gender,
      birthYear : person.birth_year,
      eyeColor : person.eye_color
    }
  }
}