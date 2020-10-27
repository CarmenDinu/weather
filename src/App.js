import React, { useState } from 'react';
import './App.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function DisplayWeather() {
	const [weather, setWeather] = useState('');
	const [location, setLocation] = useState('');
	let items = [
		{ id: 'Romania', name: 'Bucharest,ro' },
		{ id: 'Greece', name: 'Mykonos,gr' },
		{ id: 'France', name: 'Paris,fr' },
		{ id: 'Italy', name: 'Milan,it' },
		{ id: 'Spain', name: 'Madrid,es' },
		{ id: 'Sweden', name: 'Stockholm,se' },
		{ id: 'Thailand ', name: 'Bangkok,th' },
	];

	const displayCityWeather = (item) => {
		console.log(item);
		fetch(
			'https://api.aerisapi.com/observations/' +
				item.name +
				'?&format=json&filter=allstations&limit=1&client_id=Jg6oIJCPb2juVL8jgaYjE&client_secret=3nnrzN1rXcemTDdsEjP0F6XN97J4WRrct8chBZhv'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.response.ob.tempC > 18) {
					setWeather(
						'T-shirt time :) Temperature is ' +
							data.response.ob.tempC +
							' and Humidity is ' +
							data.response.ob.humidity
					);
				} else {
					setWeather(
						'Get a sweater :( Temperature is ' +
							data.response.ob.tempC +
							' and Humidity is ' +
							data.response.ob.humidity
					);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className="App">
			<header className="App-header" style={{ background: 'lightgray' }}>
				<h4>This app returns the temperature and the humidity for a list of cities.</h4>
				<div style={{ width: '400px' }}>
					<ReactSearchAutocomplete
						placeholder="Choose the city - Enter a letter here"
						items={items}
						onSelect={displayCityWeather}
						onChange={(location) => {
							return setLocation(location.displayCityWeather);
						}}
					></ReactSearchAutocomplete>
				</div>
				<div style={{ height: '100px' }}></div>
				<p>{weather}</p>
			</header>
		</div>
	);
}

export default DisplayWeather;
