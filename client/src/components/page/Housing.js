import React, { Component } from 'react';
import HousingCard from '../HousingCard';
import Loading from '../Loading';
import './Housing.css';

class Housing extends Component {
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
          housings,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <h1 className="padding-all-around-sm">
          Currently Available Affordable Housing
        </h1>

        <div className="background wrap-around padding-all-around-sm">
          {this.state.housings.map(housing => (
            <HousingCard key={housing.uuid} housing={{ ...housing }} />
          ))}
        </div>
      </div>
    );
  }
}

export default Housing;
