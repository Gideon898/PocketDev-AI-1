const chatBox =
document.getElementById("chatBox");

const input =
document.getElementById("userInput");

const btn =
document.getElementById("sendBtn");

btn.onclick = sendMessage;

function addMessage(text, type){

  const div =
  document.createElement("div");

  div.className =
  "msg " + type;

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop =
  chatBox.scrollHeight;

  return div;
}

async function sendMessage(){

  const message =
  input.value.trim();

  if(!message) return;

  addMessage(message, "user");

  input.value = "";

  const bot =
  addMessage("Thinking...", "bot");

  try{

    const response =
    await fetch("/api/chat", {

      method:"POST",

      headers:{
        "Content-Type":
        "application/json"
      },

      body: JSON.stringify({
        message
      })
    });

    const data =
    await response.json();

    bot.innerText =
      data.reply ||
      data.error ||
      "No response";

  }

  catch(error){

    bot.innerText =
    "Server error";
  }
}
