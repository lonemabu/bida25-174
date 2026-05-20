document.getElementById("contactForm").addEventListener("submit", sendMsg);
document.getElementById("sendAnotherBtn").addEventListener("click", resetForm);

function sendMsg(e) {
  e.preventDefault();
  document.getElementById("formBox").classList.add("hidden");
  document.getElementById("formSuccess").classList.remove("hidden");
}

function resetForm() {
  document.getElementById("contactForm").reset();
  document.getElementById("formSuccess").classList.add("hidden");
  document.getElementById("formBox").classList.remove("hidden");
}
