import React, { Component } from 'react';
import HousingCard from './HousingCard';
import './Housing.css';

class Housing extends Component{
  constructor(props) {
    super(props);
    this.state = {
      housings: [],
      loading: true
    };
  }
  componentDidMount = () => {
    fetch('/api/housing')
      .then(data => data.json())
      .then(housings => {
        this.setState({
          housings
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <h1 className="heading">Currently Available Affordable Housing</h1>
        
        <div className="housing-container">
          {this.state.housings.map(housing => (
            <HousingCard 
              key={housing.uuid}
              housing={{...housing}}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Housing;