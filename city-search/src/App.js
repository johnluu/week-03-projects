import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ZipCodes(props) {
  return (
  
  	
  		
  			<div>ZipCode:{props.data} </div>
  		
  );
}

function CitySearch(props) {
  return (

  	<div>
  		<label>City:  </label>
  			<input type = "text"
  				onKeyPress={props.handleKeyPress} 
  				value = {props.value}
  				placeholder = "Press Enter" >
  			</input>

  	</div>);
}


class App extends Component {

	constructor(){
		super();
		this.state = {
			city: null,
			zip: []
		}
		this.cityChanged = this.cityChanged.bind(this);
	}

cityChanged(event){
	const city = event.target.value;
	if(event.key === 'Enter')
	{
	fetch('http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase())
		.then((response) => {
			return response.json();
		})
		.then((jsonBody) => {
			console.log(jsonBody);

			const zip = jsonBody.map((c)=> <ZipCodes data ={c} />);
			this.setState({
				zip: zip
			});
		});
	}
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>

        <CitySearch
        handleKeyPress={this.cityChanged} 
        value={this.state.city}
        />


        <div className="Centered">
        <div className ="panel panel-default">
        <div className= "panel-heading">
          ZipCodes
         </div>

          

        <div className= "panel-body">
          {this.state.zip}
        
        </div>
        </div>
        </div>
      </div>
  
    );
  }
}

export default App;