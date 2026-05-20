const UNAVAIL = ["2026-06-14", "2026-06-15", "2026-07-04", "2026-07-05"];
let _nights = 0, _total = 0, _ci = "", _co = "", _room = "";

document.getElementById("ci").addEventListener("change", calcNights);
document.getElementById("co").addEventListener("change", calcNights);
document.getElementById("roomSel").addEventListener("change", calcNights);
document.getElementById("availForm").addEventListener("submit", checkAvail);
document.getElementById("changeDateBtn").addEventListener("click", resetAvail);
document.getElementById("cardNum").addEventListener("input", function () { formatCard(this); });
document.getElementById("payForm").addEventListener("submit", processPayment);

function calcNights() {
  const ci = document.getElementById("ci").value;
  const co = document.getElementById("co").value;
  if (!ci || !co) return;

  const diff = (new Date(co) - new Date(ci)) / 86400000;
  _nights = Math.max(0, Math.round(diff));
  _ci = ci;
  _co = co;

  const price = parseInt(document.getElementById("roomSel").value);
  _room  = document.getElementById("roomSel").options[document.getElementById("roomSel").selectedIndex].text.split(" \u2014")[0];
  _total = _nights * price;

  const disp = document.getElementById("nightsDisp");
  if (_nights > 0) {
    disp.classList.remove("hidden");
    document.getElementById("nightsNum").textContent = _nights + " night" + (_nights !== 1 ? "s" : "");
    document.getElementById("offerMsg").textContent  = _nights >= 7 ? " You qualify for a free extra night!" : "";
  } else {
    disp.classList.add("hidden");
  }
}

function checkAvail(e) {
  e.preventDefault();
  const ci        = document.getElementById("ci").value;
  const co        = document.getElementById("co").value;
  const msg       = document.getElementById("availMsg");
  const changeBtn = document.getElementById("changeDateBtn");
  const checkBtn  = document.getElementById("checkBtn");

  if (_nights <= 0) {
    msg.className   = "msg msg-warn";
    msg.textContent = "⚠ Please select a valid check-in and check-out date.";
    return;
  }

  const clash = UNAVAIL.some(function (d) { return d >= ci && d <= co; });

  if (clash) {
    msg.className   = "msg msg-err";
    msg.textContent = "✗ These dates are not available. Please change your dates and try again.";
    changeBtn.classList.remove("hidden");
    checkBtn.classList.add("hidden");
  } else {
    document.getElementById("step2").classList.remove("hidden");
    document.getElementById("paymentSummary").innerHTML =
      "<strong>" + _room + "</strong> &nbsp;&middot;&nbsp; " +
      _nights + " night" + (_nights !== 1 ? "s" : "") +
      " &nbsp;&middot;&nbsp; " + ci + " &rarr; " + co;
    document.getElementById("totalDisp").value = "P" + _total.toLocaleString();
    msg.className   = "msg msg-ok";
    msg.textContent = "✓ Your dates are available! Complete payment below.";
    checkBtn.classList.add("hidden");
    document.getElementById("step2").scrollIntoView({ behavior: "smooth" });
  }
}

function resetAvail() {
  document.getElementById("ci").value             = "";
  document.getElementById("co").value             = "";
  document.getElementById("availMsg").className   = "";
  document.getElementById("availMsg").textContent = "";
  document.getElementById("changeDateBtn").classList.add("hidden");
  document.getElementById("checkBtn").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("nightsDisp").classList.add("hidden");
  _nights = 0;
}

function formatCard(input) {
  var v = input.value.replace(/\D/g, "").slice(0, 16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}

function processPayment(e) {
  e.preventDefault();
  const card = document.getElementById("cardNum").value.replace(/\s/g, "");
  const btn  = document.getElementById("payBtn");
  const msg  = document.getElementById("payMsg");

  btn.textContent = "Processing…";
  btn.disabled    = true;

  setTimeout(function () {
    if (card.length === 16) {
      document.getElementById("step2").classList.add("hidden");
      document.getElementById("step3").classList.remove("hidden");
      document.getElementById("successMsg").innerHTML =
        "Your stay at <strong>Lone Aura Retreat</strong> has been confirmed.<br>" +
        _ci + " &rarr; " + _co + " &nbsp;&middot;&nbsp; " +
        _nights + " night" + (_nights !== 1 ? "s" : "") +
        " &nbsp;&middot;&nbsp; " + _room + "<br><br>" +
        "<span class='price-val'>Total Paid: P" + _total.toLocaleString() + "</span><br><br>" +
        "A confirmation will be sent to your email. We look forward to welcoming you.";
      document.getElementById("step3").scrollIntoView({ behavior: "smooth" });
    } else {
      msg.className   = "msg msg-err";
      msg.textContent = "✗ Payment not approved. Please check your card details and try again.";
      btn.textContent = "Confirm & Pay";
      btn.disabled    = false;
    }
  }, 1200);
}