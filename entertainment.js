const BOOKED = ["2026-06-14", "2026-06-20", "2026-07-04"];

document.getElementById("mDur").addEventListener("change", updatePrice);
document.getElementById("massageForm").addEventListener("submit", bookMassage);

function updatePrice() {
  document.getElementById("priceDisplay").textContent = document.getElementById("mDur").value;
}

function bookMassage(e) {
  e.preventDefault();
  const date = document.getElementById("mDate").value;
  const time = document.getElementById("mTime").value;
  const dur  = document.getElementById("mDur").value;
  const msg  = document.getElementById("massageMsg");

  msg.className = "";

  if (BOOKED.includes(date)) {
    msg.className = "msg msg-warn";
    msg.textContent = "⚠ This date is not available. Please change your date and try again.";
  } else {
    msg.className = "msg msg-ok";
    msg.textContent = "✓ Your massage is confirmed for " + date + " at " + time + " (" + dur + "). We look forward to welcoming you.";
  }
}