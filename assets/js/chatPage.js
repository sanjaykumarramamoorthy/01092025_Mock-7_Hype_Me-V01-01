const sendBtns = document.querySelectorAll(".send-btns img");

const chatInput = document.querySelector(".chat-input input");

chatInput.addEventListener("input", () => {
  if (chatInput.value !== "") {
    sendBtns[1].classList.add("active");
    sendBtns[0].classList.remove("active");
  } else {
    sendBtns[0].classList.add("active");
    sendBtns[1].classList.remove("active");
  }
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (chatInput.value !== "") {
      sendMessage(chatInput.value);
      chatInput.value = "";
    }
  }
});

sendBtns[1].addEventListener("click", () => {
  if (chatInput.value !== "") {
    sendMessage(chatInput.value);
    chatInput.value = "";
  }
});

const messages = document.querySelector(".messages");

function sendMessage(msg) {
  const time = new Date();
  messages.innerHTML += ` <div class="message sent flexbox">
        <span class="msg-text">${msg}</span>
            <small class="flexbox">${String(time.getHours() % 12).padStart(
              2,
              "0"
            )}:${String(time.getMinutes()).padStart(2, "0")}
                <div class="seen-status">
                    <img src="./assets/images/chat page/double-tick.svg" class="tick-icon" alt="">
                </div>
            </small>
    </div>
    `;
  chatData
    .find((c) => c.id == sessionStorage.getItem("activeChatId"))
    .chats.push({
      text: chatInput.value,
      time: `${String(new Date().getHours() % 12).padStart(2, "0")}:${String(
        new Date().getMinutes()
      ).padStart(2, "0")}`,
      from: "me",
    });
  Array.from(document.querySelectorAll(".last-msg .text")).find(
    (el) =>
      el.closest(".chat-item").getAttribute("data-chat-id") ==
      sessionStorage.getItem("activeChatId")
  ).innerText = msg;
  messages.scrollTop = messages.scrollHeight;
}

const chatItems = document.querySelectorAll(".chat-item");

const chatHeaderName = document.querySelector(".chat-header .name");
const chatHeaderProdName = document.querySelector(".chat-header .prod-name");
const chatProfilePic = document.querySelector(".chat-header .prod-img");

chatItems.forEach((item) => {
  item.addEventListener("click", () => {
    chatHeaderName.innerText = item.querySelector(".user-name").innerText;
    chatHeaderProdName.innerText = item.querySelector(".prod-name").innerText;
    chatProfilePic.src = item.querySelector(".prod-img").src;
    const chatId = item.getAttribute("data-chat-id");
    sessionStorage.setItem("activeChatId", chatId);
    const chat = chatData.find((c) => c.id == chatId);
    const chatMessages = document.querySelector(".messages");
    chatMessages.innerHTML = "";
    chat.chats.forEach((msg) => {
      chatMessages.innerHTML += `
        <div class="message ${msg.from === "me" ? "sent" : "received"} flexbox">
          <span class="msg-text">${msg.text}</span>
          <small class="flexbox">${msg.time}
          <div class="seen-status" ${
            msg.from === "me"
              ? 'style="visibility: visible;"'
              : 'style="visibility: hidden;"'
          }>
                    <img src="./assets/images/chat page/double-tick.svg" class="tick-icon" alt=""></div>
          </small>
        </div>
      `;
    });
  });
});

const pageClose = document.querySelector(".page-title .close-btn");

pageClose.addEventListener("click", () => {
  window.history.back();
});

let chatData = [
  {
    id: 1,
    name: "Siva Sanz",
    chats: [
      {
        text: "Hey, is it still available?",
        time: "09:00",
        from: "them",
      },
      {
        text: "yes, it's available.",
        time: "09:01",
        from: "me",
      },
    ],
  },
  {
    id: 2,
    name: "Tony",
    chats: [
      {
        text: "How much for the Yeezys?",
        time: "10:15",
        from: "them",
      },
      {
        text: "sorry, it's already been sold.",
        time: "10:16",
        from: "me",
      }
    ],
  },
  {
    id: 3,
    name: "Tushar",
    chats: [
      {
        text: "How much for the Yeezys?",
        time: "10:15",
        from: "them",
      },
      { text: "$300, negotiable.", time: "10:16", from: "me" },
      {
        text: "Can you do $250?",
        time: "10:17",
        from: "them",
      },
      {
        text: "Sorry, I can't go below $280.",
        time: "10:20",
        from: "me",
      }
    ],
  },
];
