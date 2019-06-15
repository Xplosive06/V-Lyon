class Reservation {
	constructor() {
		this.mytimer = document.getElementById("timer");
		this.myInterval;
	}
	onClickSave(stationInfosList, reservationAlert, address) {
		var self = this;
		$('#submit').on('click', function(event) {
			event.preventDefault();

			if (stationInfosList[2] !== 0) {
				self.changeReservationAlert(reservationAlert, address, this.myInterval);
			} else if (stationInfosList[2] === 0 && reservationAlert.style.display === 'block') {
				self.reservationAlertDisplay(reservationAlert, "none");
			}

			self.saveReservation(stationInfosList);
			self.cancelReservation(reservationAlert);
		});
	}

	saveReservation(stationInfosList) {
		var clientNames = [];

		clientNames.push($('#client-firstname').val());
		clientNames.push($('#client-lastname').val());

		this.storeIt(clientNames, 'localStorage');
		this.storeIt(stationInfosList, 'sessionStorage');
	}

	storageAvailable(type) {
		try {
			var storage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return e instanceof DOMException && (
					// everything except Firefox
					e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				storage.length !== 0;
		}
	}
	storeIt(listToSave, storageType) {

		if (this.storageAvailable(storageType)) {
			if (storageType === 'localStorage') {
				// Nous pouvons utiliser localStorage
				localStorage.setItem('first_name', listToSave[0]);
				localStorage.setItem('last_name', listToSave[1]);

			} else if (storageType === 'sessionStorage') {
				sessionStorage.setItem('station_address', listToSave[0]);
				sessionStorage.setItem('station_available_bike_stands', listToSave[1]);
				sessionStorage.setItem('station_available_bike', listToSave[2]);
				console.log('Méthode storeIt ' + sessionStorage.getItem('station_address'));
				console.log('Méthode storeIt ' + sessionStorage.getItem('station_available_bike_stands'));
				console.log('Méthode storeIt ' + sessionStorage.getItem('station_available_bike'));
				console.log(sessionStorage);
			}
		} else {
			// Malheureusement, localStorage n'est pas disponible
			alert(storageType + " n'est pas disponible sur votre navigateur");
		}
	}

	changeReservationAlert(reservationAlert, address) {
		var reservationAddress = document.getElementById("reservation-address");
		reservationAddress.innerText = " " + sessionStorage.getItem('station_address');
		console.log('Méthode changeReservationAlert ' + sessionStorage.getItem('station_address'));
		console.log('Méthode changeReservationAlert ' + reservationAddress.innerText);
		this.reservationAlertDisplay(reservationAlert, "block");
		this.timer(20, 0);
	}

	cancelReservation(reservationAlert) {
		$('#cancel-button').on('click', function(event) {
			event.preventDefault();
			self.reservationAlertDisplay(reservationAlert, "none");
		});
	}

	reservationAlertDisplay(reservationAlert, status) {
		reservationAlert.style.display = status;
	}

	timer(min, sec) {
		this.min = min;
		this.sec = sec;
		self = this;

		clearInterval(this.myInterval);
		this.mytimer.innerHTML = "";

		this.myInterval = setInterval(function() {
			if (min == 0 && sec == 0) {
				self.mytimer.innerHTML = "Réservation annulée";
				clearInterval(self.myInterval);
				console.log(self.myInterval);
				var reservationAlert = document.getElementById("reservation-alert");
				var reservationTitle = document.getElementById("alert-title");
				var canceledItems = document.getElementsByClassName("cancel");
				reservationAlert.className = "alert alert-danger";
				reservationTitle.innerHTML = "Réservation annulée!";
				for (var i = 0; i < canceledItems.length; i++) {
					canceledItems[i].style.display = 'none';
				}
				console.log(canceledItems);
			} else if (sec == -1) {
				min--;
				sec = 59;
				self.mytimer.innerHTML = min + " : " + sec;
			} else if (0 <= sec && sec <= 9) {
				self.mytimer.innerHTML = min + " : " + "0" + sec;
			} else if (10 <= sec && sec <= 59) {
				self.mytimer.innerHTML = min + " : " + sec;
			}
			sec--;

		}, 1000);

	}

}