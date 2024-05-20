const sectionMessages = document.querySelector("#messages");
const inputMessage = document.querySelector("#message");
const buttonMessage = document.querySelector("#send-message");
const selectModel = document.querySelector("#models");
const formMessage = document.querySelector("form");



formMessage.addEventListener("submit", (e) => e.preventDefault());
buttonMessage.addEventListener("click", insertMessageInHTML);

inputMessage.addEventListener("keyup", (event) => {
  const hasValue = inputMessage.value !== "";

  buttonMessage.classList.toggle("color-white", hasValue);
  buttonMessage.classList.toggle("color-gray", !hasValue);
  buttonMessage.disabled = !hasValue;

  if (hasValue && event.key === "Enter") {
    event.preventDefault();
    insertMessageInHTML();
  }
});

async function insertMessageInHTML() {
  const userInputMessage = inputMessage.value;

  sectionMessages.innerHTML += `
    <div class="image-name">
      <i class="bi bi-person-circle"></i>
      <h4>You</h4>
    </div>
    <p class="message-p"> ${userInputMessage} </p>
  `;

  formMessage.reset();
  resetButtonState();

 

  sectionMessages.innerHTML += `
    <div class="image-name">
      <img src="./icon.webp">
      <h4>Wit.ai</h4>
    </div>
    <p class="message-p"> ${resposta} </p>
  `;
}

function resetButtonState() {
  buttonMessage.classList.remove("color-white");
  buttonMessage.classList.add("color-gray");
  buttonMessage.disabled = true;
}
  

