class MapConstructor {
  /*=================================== JCD REQUEST ===================================*/
  constructor() {
    //Declaring variables
    this.map;
    this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a1fc8a2bf44b8faa8fead1123cf017277ac09c00";
    //Calling Reservation class
    this.reservation = new Reservation();
    //HTML elements that will be changed
    this.myAddress = document.getElementById("address");
    this.myAvailableBikeStands = document.getElementById("available_bike_stands");
    this.myBikes = document.getElementById("available_bikes");
    this.reservationAlert = document.getElementById("reservation-alert");
    
    //Calling Reservation class
    this.reservation = new Reservation();
    this.reservation.checkReservation(this.reservationAlert);
    this.reservation.cancelReservation(this.reservationAlert);
    //Calling the needed methods
    this.getInfo();
    this.preFillFields();
  }
  //Fill the first_name and last_name fields if values exists 
  //in the local storage
  preFillFields() {
    var localFirstName = localStorage.getItem('first_name');
    var localLastName = localStorage.getItem('last_name');

    if (localFirstName && localLastName) {
      $('#client-firstname').val(localFirstName);
      $('#client-lastname').val(localLastName);
    }
  }

  //Getting infos from JCDecaux API and building the map
  getInfo() {
    var availableBikes = 0; //The variable must be declared to "0"
    var imageClusterPath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
    var markersList = [];
    //Change the number of stations and bikes in the presentation
    var availableBikesSpan = document.getElementById("total_available_bikes");
    var availableStationsSpan = document.getElementById("total_available_stations");
    var self = this;

    $.get(this.url, function(data, status) {

      /* ===================================== MAP =======================================*/

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(45.756901, 4.838194),
        mapTypeId: 'terrain'
      });

      // Create a <script> tag and set the USGS URL as the source.
      var script = document.createElement('script');
      // This example uses a local copy of the GeoJSON stored at
      // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
      document.getElementsByTagName('head')[0].appendChild(script);



      // Loop through the results array and place a marker and an icon for each
      // set of coordinates.
      for (var i = 0; i < data.length; i++) {
        var station = new Station(data[i].position.lat, data[i].position.lng, data[i].available_bikes, data[i].name, data[i].address, data[i].available_bike_stands);
        var latLng = new google.maps.LatLng(station.getPositionLat(), station.getPositionLng());
        var marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: station.getName(),
          icon: self.getIcons(station.getAvailable_bikes())
        });

        availableBikes += parseInt(station.getAvailable_bikes(), 10); //"10" is for using decimal
        //Adding listeners on markers **
        self.addInfoWindow(marker, station, i);
        markersList.push(marker);
      }
      availableBikesSpan.innerText = availableBikes;
      availableStationsSpan.innerText = data.length;
      self.markerClusterers(this.map, markersList, imageClusterPath);
    });

  }
  //**
  addInfoWindow(marker, station, i) {
    var self = this;

    google.maps.event.addListener(marker, 'click', function() {
      //change form on click onto a marker **
      self.changeFormInfos(station, i);

    });
  }
  //If station doesn't have any bikes, change the icon for a blue one
  getIcons(bikes) {
    if (bikes <= 0)
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  }
  //**
  changeFormInfos(station, i) {
    var stationList = [];
    stationList.push(station.getAddress(), station.getAvailable_bike_stands(), station.getAvailable_bikes());

    if (station.getAvailable_bikes() == 0) {
      this.myAvailableBikeStands.innerText = "Aucun vélo de disponible";
      this.myBikes.innerText = "Veuillez choisir une autre station";
    } else {

      this.myAvailableBikeStands.innerText = station.getAvailable_bike_stands() + " places disponibles";
      this.myBikes.innerText = station.getAvailable_bikes() + " vélos disponibles";

    }
    this.myAvailableBikeStands.style.display = 'block';
    this.myBikes.style.display = 'block';

    this.myAddress.innerText = "Adresse : " + station.getAddress();
    //Saving the reservation
    this.reservation.onClickSave(stationList, this.reservationAlert, station.getAddress());
  }

  markerClusterers(map, markersList, imageClusterPath) {
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markersList, {
      imagePath: imageClusterPath
    });
  }

}