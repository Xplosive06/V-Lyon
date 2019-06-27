class Station {
	constructor(positionLat, positionLng, available_bikes, name, address,  available_bike_stands) {
		this.positionLat = positionLat;
		this.positionLng = positionLng;
		this.available_bikes = available_bikes;
		this.name = name;
		this.address = address;
		this.available_bike_stands = available_bike_stands;

	}

	getPositionLat() {
		return this.positionLat;
	}

	getPositionLng() {
		return this.positionLng;
	}

	getAvailable_bikes() {
		return this.available_bikes;
	}

	getName() {
		return this.name;
	}

	getAddress() {
		return this.address;
	}

	getAvailable_bike_stands() {
		return this.available_bike_stands;
	}

}