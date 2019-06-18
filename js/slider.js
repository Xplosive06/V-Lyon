class Slider {
  constructor() {
    this.slideIndex = 1;
    this.myInterval;
    //Calling the needed methods
    this.currentSlide(1);
    this.prevAndNextOnClick();
    this.autoSliding();
  }
  // Adding listeners on buttons
  prevAndNextOnClick() {
    var self = this;
    document.getElementById("prev").addEventListener("click", function() {
      self.plusSlides(-1)
    }, false);
    document.getElementById("next").addEventListener("click", function() {
      self.plusSlides(1)
    }, false);
    // For using the keyboard's arrows
    document.addEventListener("keydown", function(event) {
      if (event.keyCode == 39) { //Right arrow
        self.plusSlides(1);
      } else if (event.keyCode == 37) { //Left arrow
        self.plusSlides(-1);
      }
    }, false);

  }

  // Next/previous controls
  plusSlides(n) {
    var self = this;
    this.showSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  currentSlide(n) {
    var self = this;
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    // As long as "n" is smaller than the total of slides, we're adding 1
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    } //Hidding the other slides
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    // Showing the good one
    slides[this.slideIndex - 1].style.display = "block";
  }

  autoSliding() {
    var myIntervalBis;
    var self = this;
    //If checkbox is checked, we're moving slides each 5 seconds
    if ($('#checkbox').is(":checked")) {
      myIntervalBis = setInterval(function() {
        self.plusSlides(1);
      }, 5000);
    }
    //If checkbox is not checked anymore, we clear the intervals
    $('#checkbox').change(function() {
      clearInterval(myIntervalBis); // Needed each time we use the checkbox

      if ($(this).is(':checked')) {
        this.myInterval = setInterval(function() {
          self.plusSlides(1);
        }, 5000);
      } else {
        clearInterval(this.myInterval);
      }
    });

  }
}