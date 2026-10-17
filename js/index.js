const track = document.querySelector("#galleryTrack");
const prevButton = document.querySelector(".gallery_arrow.prev");
const nextButton = document.querySelector(".gallery_arrow.next");
const dots = document.querySelectorAll("#galleryDots .dot");

// Kør kun gallerikoden, hvis alle nødvendige elementer findes på siden.
if (track && prevButton && nextButton && dots.length > 0) {
  const originalCards = Array.from(track.querySelectorAll(".gallery_card"));
  const cardCount = originalCards.length;

  if (cardCount > 0) {
    // Find kortets scrollposition i forhold til galleriets indhold.
    function getCardScrollLeft(card) {
      const trackLeft = track.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      return track.scrollLeft + cardLeft - trackLeft;
    }

    // Brug det kort, der er tættest på visningens venstre kant, som det aktive kort.
    function getNearestCardIndex() {
      return originalCards.reduce(
        (nearest, card, index) => {
          const distance = Math.abs(getCardScrollLeft(card) - track.scrollLeft);
          return distance < nearest.distance ? { index, distance } : nearest;
        },
        { index: 0, distance: Infinity },
      ).index;
    }

    // Markér prikken, der svarer til det aktuelt viste kort.
    function updateDots() {
      const activeIndex = getNearestCardIndex();

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    // Rul til et bestemt kort; glidende rulning bruges til brugerens navigation.
    function scrollToCard(card, behavior = "smooth") {
      track.scrollTo({
        left: getCardScrollLeft(card),
        behavior,
      });
    }

    // Flyt ét kort ad gangen. Der navigeres kun mellem de oprindelige kort,
    // så pilene stopper ved galleriets ender i stedet for at lave et loop.
    function scrollGallery(direction) {
      const currentIndex = getNearestCardIndex();
      const targetIndex = currentIndex + direction;
      const targetCard = originalCards[targetIndex];

      if (targetCard) {
        scrollToCard(targetCard);
      }
    }

    prevButton.addEventListener("click", () => scrollGallery(-1));
    nextButton.addEventListener("click", () => scrollGallery(1));

    // Prikkerne giver direkte adgang til hvert kort.
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        scrollToCard(originalCards[index]);
      });
    });

    // Opdatér den aktive prik under scroll og efter ændringer i vinduesstørrelsen.
    track.addEventListener("scroll", updateDots);

    window.addEventListener("resize", () => {
      window.requestAnimationFrame(updateDots);
    });

    // Start galleriet ved første kort uden en synlig indledende animation.
    scrollToCard(originalCards[0], "instant");
    updateDots();
  }
}
