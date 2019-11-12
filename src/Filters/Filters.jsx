import React from 'react';
import DateFilter from './DateFilter';
import OptionsFilter from './OptionsFilters';

class Filters extends React.Component {

  constructor(props) {

    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  handleDateChange(event) {

    let props = this.props.filters
    props[event.target.name] = new Date(event.target.value)

    if (props['dateFrom'].valueOf() >= props['dateTo'].valueOf())  
        props['dateTo'] = new Date(props['dateFrom'].valueOf() + 86400000)
    else if (props['dateTo'].valueOf() > props['dateFrom'].valueOf() + 2592000000) 
        props['dateTo'] = new Date(props['dateFrom'].valueOf() + 2592000000)
    
    this.props.onFilterChange(props)
  }

  handleOptionChange(event) {

    let payload = this.props.filters
    payload[event.target.name] = event.target.value

    this.props.onFilterChange(payload)
  }

  render() {
    return (
      <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
        <div className="navbar-item">
          <DateFilter
            date={ this.props.filters.dateFrom}
            onDateChange={ this.handleDateChange }
            name="dateFrom"
            icon="sign-in-alt" />
        </div>
        <div className="navbar-item">
          <DateFilter
            date={ this.props.filters.dateTo }
            onDateChange={ this.handleDateChange }
            name="dateTo"
            icon="sign-out-alt" />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            onOptionChange={ this.handleOptionChange }
            options={ [ {value: undefined, name: 'País'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
            selected={ this.props.filters.country }
            name="country"
            icon="globe" />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            onOptionChange={ this.handleOptionChange }
            options={ [ {value: undefined, name: 'Precio'}, {value: 1, name: '$1,00'}, {value: 2, name: '$$2,00'}, {value: 3, name: '$$$3,00'}, {value: 4, name: '$$$$4,00'} ] }
            selected={ this.props.filters.price }
            name="price"
            icon="dollar-sign" />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            onOptionChange={ this.handleOptionChange }
            options={ [ {value: undefined, name: 'Tamaño'}, {value: 10, name: 'Pequeño'}, {value: 20, name: 'Mediano'}, {value: 30, name: 'Grande'} ] }
            selected={ this.props.filters.rooms }
            name="rooms"
            icon="bed" />
        </div>
      </nav>
    )
  }
}

export default Filters;