import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  return (<div className="Centered">
  <div className ="panel panel-default">
  	<div className= "panel-heading">
  		{props.data.LocationText}
  	</div>
  	
  	<div className= "panel-body">
  		<ul>
  			<li>State:{props.data.State} </li>
  			<li>Location: ({props.data.Lat}, {props.data.Long}) </li>
  			<li>Population (estimated): {props.data.EstimatedPopulation} </li>
  			<li>Total Wages: {props.data.TotalWages} </li>
  		</ul>	
  	</div>
  </div>
 </div>);
}

function ZipSearchField(props) {
  return (
  	<div> 
  	<label>Zip Code:  </label>
  	<input type = "text" placeholder="Try 10013" maxLength="5" onChange={props.handleChange} value = {props.value} />
  	</div>);
}


class App extends Component {

	constructor(){
		super();
		this.state = {
			zipCode: "",
			cities: []
		}
		this.zipCodeChanged = this.zipCodeChanged.bind(this);
	}

zipCodeChanged(event){
	const zip = event.target.value;

	if(zip.length === 5){
	fetch('http://ctp-zip-api.herokuapp.com/zip/' + zip)
		.then((response) => {
			return response.json();
		})
		.then((jsonBody) => {
			console.log(jsonBody);

			const cityComps = jsonBody.map((c)=> <City data ={c} />);
			this.setState({
				cities: cityComps
			});
		});
	}

	this.setState({
		zipCode:zip
	});
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={this.zipCodeChanged} value={this.state.zipCode}/>
        <div>
          {this.state.cities}
        </div>
      </div>
    );
  }
}

export default App;
