gsap.registerPlugin(Draggable);

      let count = 0;
      const loaderText = document.getElementById("loader-text");
      const preloader = document.getElementById("preloader");
      const mainContent = document.getElementById("main-content");

      const interval = setInterval(() => {
        if (count >= 100) {
          clearInterval(interval);
          gsap.to(preloader, {
            x: "-100%",
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              preloader.style.display = "none";
              mainContent.style.display = "block";

              const images = document.querySelectorAll(".draggable");

              images.forEach((img, i) => {
                gsap.from(img, {
                  opacity: 0,
                  scale: 0.4,
                  duration: 1,
                  delay: i * 0.25,
                  ease: "power3.out",
                });
              });

              Draggable.create(".draggable", {
                type: "x,y",
                bounds: window,
                onPress: function () {
                  this.target.style.cursor = "grabbing";
                },
                onRelease: function () {
                  this.target.style.cursor = "grab";
                },
              });
            },
          });
        } else {
          count++;
          loaderText.innerText = count + "%";
        }
      }, 20);