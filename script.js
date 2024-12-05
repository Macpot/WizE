const messageForm = document.querySelector(".prompt__form");
const chatHistoryContainer = document.querySelector(".chats");
const suggestionItems = document.querySelectorAll(".suggests__item");
const hljsThemeLink = document.getElementById("hljs-theme");
const themeToggleButton = document.getElementById("themeToggler");
const clearChatButton = document.getElementById("deleteButton");

// State variables
let currentUserMessage = null;
let isGeneratingResponse = false;

const GOOGLE_API_KEY = "AIzaSyAvixgCKiD5-aaIouWkQBLMrqnBFMSTYEY";
const API_REQUEST_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

// Load saved data from local storage
const loadSavedChatHistory = () => {
    const savedConversations = JSON.parse(localStorage.getItem("saved-api-chats")) || [];
    chatHistoryContainer.innerHTML = ''; // Clear the current chat history first (to avoid duplicates)

    savedConversations.forEach(conversation => {
        // Create and display the user (outgoing) message
        const userMessageHtml = `
            <div class="message__content">
                <img class="message__avatar" src="images/user.svg" alt="User avatar">
                <p class="message__text">${conversation.userMessage}</p>
            </div>
        `;
        const outgoingMessageElement = createChatMessageElement(userMessageHtml, "message--outgoing");
        chatHistoryContainer.appendChild(outgoingMessageElement);

        // If the bot's response exists, create and display it
        const responseText = conversation.apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsedApiResponse = marked.parse(responseText);

        const responseHtml = `
            <div class="message__content">
                <img class="message__avatar" src="images/wize.svg" alt="Wize avatar">
                <p class="message__text"></p>
                <div class="message__loading-indicator hide">
                    <div class="message__loading-bar"></div>
                    <div class="message__loading-bar"></div>
                    <div class="message__loading-bar"></div>
                </div>
            </div>
            <span onClick="copyMessageToClipboard(this)" class="message__icon hide"><i class='bx bx-copy'></i></span>
        `;

        const incomingMessageElement = createChatMessageElement(responseHtml, "message--incoming");
        chatHistoryContainer.appendChild(incomingMessageElement);

        const messageTextElement = incomingMessageElement.querySelector(".message__text");

        // Display bot's response with typing effect
        showTypingEffect(responseText, parsedApiResponse, messageTextElement, incomingMessageElement, true);
    });

    // Scroll to the bottom of the chat container
    chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;

    // Hide the header if there are saved conversations
    document.body.classList.toggle("hide-header", savedConversations.length > 0);
};




// Create a new chat message element
const createChatMessageElement = (htmlContent, ...cssClasses) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", ...cssClasses);
    messageElement.innerHTML = htmlContent;
    return messageElement;
};

// Set Highlight.js theme based on the current mode
const setHighlightJsTheme = (isLightTheme) => {
    hljsThemeLink.href = isLightTheme
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css" // Light theme
: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai.min.css";
};

// Show typing effect
const showTypingEffect = (rawText, htmlText, messageElement, incomingMessageElement, skipEffect = false) => {
    const copyIconElement = incomingMessageElement.querySelector(".message__icon");
    copyIconElement.classList.add("hide"); // Initially hide copy button

    if (skipEffect) {
        // Display content directly without typing
        messageElement.innerHTML = htmlText;
        hljs.highlightAll();
        addCopyButtonToCodeBlocks();
        copyIconElement.classList.remove("hide"); // Show copy button
        isGeneratingResponse = false;
        return;
    }

    const wordsArray = rawText.split(' ');
    let wordIndex = 0;

    const typingInterval = setInterval(() => {
        messageElement.innerText += (wordIndex === 0 ? '' : ' ') + wordsArray[wordIndex++];
        if (wordIndex === wordsArray.length) {
            clearInterval(typingInterval);
            isGeneratingResponse = false;
            messageElement.innerHTML = htmlText;
            hljs.highlightAll();
            addCopyButtonToCodeBlocks();
            copyIconElement.classList.remove("hide");
        }
    }, 75);
};

// Fetch API response based on user input
const requestApiResponse = async (incomingMessageElement) => {
    const messageTextElement = incomingMessageElement.querySelector(".message__text");

    try {
        const response = await fetch(API_REQUEST_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: currentUserMessage }] }]
            }),
        });

        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.error.message);

        const responseText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) throw new Error("Invalid API response.");

        const parsedApiResponse = marked.parse(responseText);
        const rawApiResponse = responseText;

        showTypingEffect(rawApiResponse, parsedApiResponse, messageTextElement, incomingMessageElement);

        // Save conversation in local storage
        let savedConversations = JSON.parse(localStorage.getItem("saved-api-chats")) || [];
        savedConversations.push({
            userMessage: currentUserMessage,
            apiResponse: responseData
        });
        localStorage.setItem("saved-api-chats", JSON.stringify(savedConversations));
    } catch (error) {
        isGeneratingResponse = false;
        messageTextElement.innerText = error.message;
        messageTextElement.closest(".message").classList.add("message--error");
    } finally {
        incomingMessageElement.classList.remove("message--loading");
    }
};

// Add copy button to code blocks
// Add copy button to code blocks
const addCopyButtonToCodeBlocks = () => {
    // Remove previous copy buttons if they exist
    const existingButtons = document.querySelectorAll('.code__copy-btn');
    existingButtons.forEach(button => button.remove());

    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
        const codeElement = block.querySelector('code');
        let language = [...codeElement.classList].find(cls => cls.startsWith('language-'))?.replace('language-', '') || 'Text';

        // Check if a language label already exists
        if (!block.querySelector('.code__language-label')) {
            const languageLabel = document.createElement('div');
            languageLabel.innerText = language.charAt(0).toUpperCase() + language.slice(1);
            languageLabel.classList.add('code__language-label');
            block.appendChild(languageLabel);
        }

        // Copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = `<i class='bx bx-copy'></i>`;
        copyButton.classList.add('code__copy-btn');
        block.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeElement.innerText).then(() => {
                copyButton.innerHTML = `<i class='bx bx-check'></i>`;
                setTimeout(() => {
                    copyButton.innerHTML = `<i class='bx bx-copy'></i>`;
                }, 2000);
            }).catch(err => {
                console.error("Copy failed:", err);
                alert("Unable to copy text!");
            });
        });
    });
};


// Show loading animation during API request
const displayLoadingAnimation = () => {
    const loadingHtml = `
        <div class="message__content">
            <img class="message__avatar" src="images/wize.svg" alt="Wize avatar">
            <p class="message__text"></p>
            <div class="message__loading-indicator">
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
            </div>
        </div>
        <span onClick="copyMessageToClipboard(this)" class="message__icon hide"><i class='bx bx-copy'></i></span>
    `;
    const loadingMessageElement = createChatMessageElement(loadingHtml, "message--incoming", "message--loading");
    chatHistoryContainer.appendChild(loadingMessageElement);

    requestApiResponse(loadingMessageElement);
};

// Copy message to clipboard
const copyMessageToClipboard = (copyButton) => {
    const messageContent = copyButton.parentElement.querySelector(".message__text").innerText;

    navigator.clipboard.writeText(messageContent);
    copyButton.innerHTML = `<i class='bx bx-check'></i>`; // Confirmation icon
    setTimeout(() => copyButton.innerHTML = `<i class='bx bx-copy'></i>`, 1000); // Revert icon after 1 second
};

// Handle sending chat messages
const handleOutgoingMessage = () => {
    // Get the current message text
    currentUserMessage = messageForm.querySelector(".prompt__form-input").value.trim() || currentUserMessage;

    if (!currentUserMessage || isGeneratingResponse) return; // Exit if no message or already generating response

    isGeneratingResponse = true;

    // Create outgoing message HTML
    const outgoingMessageHtml = `
        <div class="message__content">
            <img class="message__avatar" src="images/user.svg" alt="User avatar">
            <p class="message__text">${currentUserMessage}</p>
        </div>
    `;
    const outgoingMessageElement = createChatMessageElement(outgoingMessageHtml, "message--outgoing");
    
    // Immediately append the outgoing message to the chat container
    chatHistoryContainer.appendChild(outgoingMessageElement);

    // Scroll to the bottom of the chat container
    chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;

    // Clear the input field
    messageForm.reset();
    document.body.classList.add("hide-header");

    // Show loading animation and call API after a short delay
    setTimeout(displayLoadingAnimation, 500); // Show loading animation after delay
};




// Automatically set theme based on system preference
const setThemeBasedOnSystemPreference = () => {
    const isLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;

    // Apply theme
    document.body.classList.toggle("light_mode", isLightTheme);
    // Set Highlight.js theme based on the current mode
    setHighlightJsTheme(isLightTheme);

    // Save the theme preference in localStorage
    localStorage.setItem("themeColor", isLightTheme ? "light_mode" : "dark_mode");
};

// Listen for system theme changes
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
themeMediaQuery.addEventListener("change", () => {
    const isLightTheme = themeMediaQuery.matches;
    document.body.classList.toggle("light_mode", isLightTheme);
    setHighlightJsTheme(isLightTheme);

    // Update the theme preference in localStorage
    localStorage.setItem("themeColor", isLightTheme ? "light_mode" : "dark_mode");
});

// Set the initial theme based on system preference when the page loads
setThemeBasedOnSystemPreference();


// Clear all chat history
clearChatButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all chat history?")) {
        localStorage.removeItem("saved-api-chats");
        // Reload chat history to reflect changes
        loadSavedChatHistory();
        currentUserMessage = null;
        isGeneratingResponse = false;
    }
});

function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById("greeting");
    if (hour < 12) {
        greetingElement.textContent = "Good Morning!";
    } else if (hour < 18) {
        greetingElement.textContent = "Good Afternoon!";
    } else {
        greetingElement.textContent = "Good Evening!";
    }
}

updateGreeting();

// Handle click on suggestion items
suggestionItems.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
        currentUserMessage = suggestion.querySelector(".suggests__item-text").innerText;
        handleOutgoingMessage();
    });
});

// Prevent default from submission and handle outgoing message
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleOutgoingMessage();
});


// Check URL for a query parameter and send that as a message
const urlParams = new URLSearchParams(window.location.search);
const messageFromUrl = urlParams.get('message');  // 'message' is the query parameter

if (messageFromUrl) {
    currentUserMessage = decodeURIComponent(messageFromUrl);  // Decode URL-encoded message
    handleOutgoingMessage();  // Send the message programmatically
}


// Load saved chat history on page load
loadSavedChatHistory();
