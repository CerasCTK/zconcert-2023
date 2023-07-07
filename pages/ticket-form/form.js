function incrementTicket(elementId) {
  const input = document.getElementById(elementId);
  input.value = parseInt(input.value) + 1;
}

function decrementTicket(elementId) {
  const input = document.getElementById(elementId);
  const value = parseInt(input.value);
  input.value = value > 0 ? value - 1 : 0;
}

function clearPlaceholder(input) {
  input.placeholder = "";
}
