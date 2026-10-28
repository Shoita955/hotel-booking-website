document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const checkin = document.querySelector("#checkin");
  const checkout = document.querySelector("#checkout");

  if (checkin) checkin.min = minDate;
  if (checkout) checkout.min = minDate;

  if (checkin && checkout) {
    checkin.addEventListener("change", function () {
      checkout.min = checkin.value || minDate;
      if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = "";
      }
    });
  }

  // Read the room selected from the Rooms page
  const roomSelect = document.querySelector("#room-type");
  const params = new URLSearchParams(window.location.search);
  const selectedRoom = params.get("room");

  if (roomSelect && selectedRoom) {
    const option = Array.from(roomSelect.options).find(
      item => item.value.toLowerCase() === selectedRoom.toLowerCase()
    );
    if (option) roomSelect.value = option.value;
  }

  // Booking form demo
  const bookingForm = document.querySelector("#booking-form");
  const bookingNotice = document.querySelector("#booking-notice");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      if (!checkin.value || !checkout.value ||
          checkout.value <= checkin.value) {
        alert("Please select a check-out date after check-in.");
        return;
      }

      const name = document.querySelector("#guest-name").value.trim();
      const room = roomSelect.value;
      const guests = document.querySelector("#guest-count").value;

      bookingNotice.textContent =
        "Thank you, " + name + "! Your demo booking request for " +
        room + " room and " + guests + " guest(s) has been prepared. " +
        "No real reservation has been made. Please contact hotel management to confirm availability.";
      bookingNotice.style.display = "block";
    });
  }

  // Contact hotel owner / management demo
  const contactForm = document.querySelector("#contact-form");
  const contactNotice = document.querySelector("#contact-notice");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const guestName = document.querySelector("#contact-name").value.trim();

      contactNotice.textContent =
        "Thank you, " + guestName + ". Your message has been checked in this demo. " +
        "It has NOT been sent to the hotel owner. Connect an email service or backend to deliver messages.";
      contactNotice.style.display = "block";
      contactForm.reset();
    });
  }
});