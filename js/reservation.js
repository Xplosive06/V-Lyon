class Reservation {
	constructor() {
		this.mytimer = document.getElementById("timer");
		this.myInterval;
	}
	onClickSave(stationInfosList, reservationAlert, address) {
		var self = this;
		$('#submit').on('click', function(event) {
			event.preventDefault(); //To avoid the page to reload
			self.saveReservation(stationInfosList);
			//If there is at least one bike
			if (stationInfosList[2] !== 0) {
				self.changeReservationAlert(reservationAlert, address, this.myInterval);
			} else if (stationInfosList[2] === 0 && reservationAlert.style.display === 'block') {
				//If not, we hide the block
				self.reservationAlertDisplay(reservationAlert, "none");
			}

			self.cancelReservation(reservationAlert);
		});
	}

	saveReservation(stationInfosList) {
		var clientNames = [];
		//Saving the user's last and first names
		clientNames.push($('#client-firstname').val());
		clientNames.push($('#client-lastname').val());

		this.storeIt(clientNames, 'localStorage');
		//Saving station's information
		this.storeIt(stationInfosList, 'sessionStorage', 'station');
	}

	storageAvailable(type) {
		//Testing if storage is available
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
	storeIt(listToSave, storageType, name) {

		if (this.storageAvailable(storageType)) {
			if (storageType === 'localStorage') {
				// We can use localstorage
				localStorage.setItem('first_name', listToSave[0]);
				localStorage.setItem('last_name', listToSave[1]);

			} else if (storageType === 'sessionStorage' && name === 'station') {
				sessionStorage.setItem('station_address', listToSave[0]);
				sessionStorage.setItem('station_available_bike_stands', listToSave[1]);
				sessionStorage.setItem('station_available_bike', listToSave[2]);
				console.log("storeIt" + sessionStorage.getItem('station_address'));

			} else if (storageType === 'sessionStorage' && name === "timer") {
				sessionStorage.setItem('timer_minutes', listToSave[0]);
				sessionStorage.setItem('timer_seconds', listToSave[1]);
			}
		} else {
			// Unfortunately storage is not available
			alert(storageType + " n'est pas disponible sur votre navigateur");
		}
	}

	changeReservationAlert(reservationAlert, address) {
		var reservationAddress = document.getElementById("reservation-address");
		//Adding the address of the station where the bike is booked
		reservationAddress.innerText = " " + sessionStorage.getItem('station_address');
						console.log('changeReservationAlert' + sessionStorage.getItem('station_address'));

		//Displaying the current reservation
		this.reservationAlertDisplay(reservationAlert, "block");
		this.timer(20, 0);
	}
	//Hidding the reservation block if cancel button is clicked
	cancelReservation(reservationAlert) {
		$('#cancel-button').on('click', function(event) {
			event.preventDefault();
			self.reservationAlertDisplay(reservationAlert, "none");
		});
	}
	//Method to change the display of blocks
	reservationAlertDisplay(reservationAlert, status) {
		reservationAlert.style.display = status;
	}

	timer(min, sec) {
		var timer = [];

		self = this;
		//Always clearing interval and timer
		clearInterval(this.myInterval);
		this.mytimer.innerHTML = "";

		this.myInterval = setInterval(function() {
			//Cancel reservation if timer is out
			if (min == 0 && sec == 0) {
				self.mytimer.innerHTML = "Réservation annulée";
				clearInterval(self.myInterval);

				var reservationAlert = document.getElementById("reservation-alert");
				var reservationTitle = document.getElementById("alert-title");
				var canceledItems = document.getElementsByClassName("cancel");
				//Changed style for an alert one
				reservationAlert.className = "alert alert-danger";
				reservationTitle.innerHTML = "Réservation annulée!";

				for (var i = 0; i < canceledItems.length; i++) {
					canceledItems[i].style.display = 'none';
				}

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
			//Store the timer
			timer.push(min);
			timer.push(sec);
			self.storeIt(timer, 'sessionStorage', 'timer');

			timer.length = 0;

		}, 1000);

	}

}