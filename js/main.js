var stationContract, map;
var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a1fc8a2bf44b8faa8fead1123cf017277ac09c00";
var slideIndex = 1;
const mapConstructor = new MapConstructor(map, stationContract, url);
const slider = new Slider(slideIndex);
const canvas = new CanvasConstructor();


mapConstructor.getInfo();
mapConstructor.preFillFields();

slider.currentSlide(1);
slider.prevAndNextOnClick();
slider.autoSliding();
canvas.mouseConstructor();
canvas.touchConstructor();