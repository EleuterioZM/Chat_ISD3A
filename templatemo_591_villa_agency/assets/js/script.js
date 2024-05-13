const sectionMessages = document.querySelector("#messages");
const inputMessage = document.querySelector("#message");
const buttonMessage = document.querySelector("#send-message");
const selectModel = document.querySelector("#models");
const formMessage = document.querySelector("form");

const accessToken = 'REGRM2PC3DFZAYD6ELHU4BOWBORAU2RX';

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

  const resposta = await enviarMensagemWitAI(userInputMessage);

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

async function enviarMensagemWitAI(input) {
    try {
      const response = await fetch(`https://api.wit.ai/message?v=20210501&q=${encodeURIComponent(input)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Erro ao acessar a API do Wit.ai');
      }
  
      const data = await response.json();
  
      console.log('Resposta da API do Wit.ai:', data); // Adiciona este console.log
  
      if (!data.text) {
        throw new Error('Resposta da API do Wit.ai está vazia');
      }
  
      return data.text;
    } catch (error) {
      console.error('Erro ao enviar mensagem para a API do Wit.ai:', error.message);
      return 'Desculpe, ocorreu um erro ao processar sua solicitação';
    }
  }

