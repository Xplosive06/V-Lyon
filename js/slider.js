class Slider {
  constructor() {
    this.slideIndex = 1;
    this.myInterval;

    this.currentSlide(1);
    this.prevAndNextOnClick();
    this.autoSliding();
  }

  prevAndNextOnClick() {
    var self = this;
    document.getElementById("prev").addEventListener("click", function() {
      self.plusSlides(-1)
    }, false);
    document.getElementById("next").addEventListener("click", function() {
      self.plusSlides(1)
    }, false);
    document.addEventListener("keydown", function(event) {
      if (event.keyCode == 39) {
        self.plusSlides(1);
      } else if (event.keyCode == 37) {
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

    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[this.slideIndex - 1].style.display = "block";
  }

  autoSliding() {
    var myIntervalBis;
    var self = this;
    if ($('#checkbox').is(":checked")) {
      myIntervalBis = setInterval(function() {
        self.plusSlides(1);
      }, 5000);
    }

    $('#checkbox').change(function() {
      clearInterval(myIntervalBis);

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