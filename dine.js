const DINE_BOOKED = ["2026-06-18", "2026-06-25", "2026-07-10"];

document.getElementById("dineForm").addEventListener("submit", checkDineAvail);
document.getElementById("bookTableBtn").addEventListener("click", bookTable);

function checkDineAvail(e) {
  e.preventDefault();
  const date    = document.getElementById("dDate").value;
  const guests  = document.getElementById("dGuests").value;
  const seating = document.getElementById("dSeating").value;
  const status  = document.getElementById("dineStatus");
  const bookBtn = document.getElementById("bookTableBtn");
  const checkBtn = document.getElementById("checkBtn");

  if (DINE_BOOKED.includes(date)) {
    status.className = "msg msg-err";
    status.textContent = "✗ This date is fully booked. Please select a different date and try again.";
    bookBtn.classList.add("hidden");
  } else {
    status.className = "msg msg-ok";
    status.textContent = "✓ Your date is available! Click below to confirm your reservation.";
    bookBtn.classList.remove("hidden");
    checkBtn.classList.add("hidden");
  }

  bookBtn._date    = date;
  bookBtn._guests  = guests;
  bookBtn._seating = seating;
}

function bookTable() {
  const btn        = document.getElementById("bookTableBtn");
  const confirmDiv = document.getElementById("dineConfirm");
  const confirmMsg = document.getElementById("dineConfirmMsg");

  confirmMsg.textContent = "🍽 Your table is confirmed for " + btn._date + " (" + btn._seating + ") with " + btn._guests + ". We look forward to dining with you.";
  confirmDiv.classList.remove("hidden");
  document.getElementById("dineStatus").className = "hidden";
  btn.classList.add("hidden");
}
