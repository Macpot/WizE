@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

*{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
    transition: background 0.3s ease;
}

:root{
    --primary-color: #131314;
    --secondary-color: #1E1F20;
    --code-color: #0D0D0D;
    --secondary-hover-color: #333537;
    --border-color: rgba(255, 255, 255, 0.1); 
  
    --focus-color: #282A2C;
    --focus-hover-color: #37393B;
  
    --button-hover-color: #2f3030;
  
    --text-color: #fff;
    --text-secondary-color: #D8D8D8;
    --heading-secondary-color: #444746;
    --placeholder-color: #ABAFB3;
}

.light_mode{
    --primary-color: #FFFFFF;
    --secondary-color: #F9F9F9;
    --code-color: #F9F9F9;
    --secondary-hover-color: #DDE3EA;
    --border-color: rgba(0, 0, 0, 0.1); 
  
    --focus-color: #E9EEF6;
    --focus-hover-color: #E1E6ED;
  
    --button-hover-color: #E9ECF1;
  
    --text-color: #000;
    --text-secondary-color: #4D4D4D;
    --heading-secondary-color: #C4C7C5;
    --placeholder-color: #717075;
}

body{
    background: var(--primary-color);
}

.header,
.chats .message,
.chats .message .message__content,
.prompt__form{
    margin: 0 auto;
    max-width: 824px;
}

body.hide-header .header{
    margin: 0;
    display: none;
}

.navbar{
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: rgba(var(--primary-color));
    z-index: 1000;
    backdrop-filter: blur(20px);
}

.navbar__logo{
    color: var(--text-secondary-color);
    font-weight: 600;
}

.navbar__button{
    padding: 0.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    border: none;
    background: var(--secondary-color);
    color: var(--text-color);
    cursor: pointer;
    transition: background 0.3s ease;
}

.navbar__button:hover{
    background: var(--secondary-hover-color);
}

.header{
    margin-top: 6vh;
}

.header__title h1{
    width: fit-content;
    background: linear-gradient(to right, #0072ff, #fff2ea);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3.25rem;
    font-weight: 600;
    line-height: 4rem;
}

.header__title h2{
    color: var(--heading-secondary-color);
    font-size: 3.25rem;
    font-weight: 600;
}

.suggests{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4.875rem;
    gap: 0.5rem;
}

.suggests__item{
    background: var(--secondary-color);
    color: var(--text-secondary-color);
    padding: 1rem;
    height: 12.5rem;
    width: 12.5rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: background 0.3s ease;
}

.suggests__item:hover{
    background: var(--secondary-hover-color);
}

.suggests__item-text{
    font-weight: 500;
    line-height: 1.375rem;
}

.suggests__item-icon{
    text-align: right;
}

.suggests__item-icon i{
    font-size: 1.5rem;
    background: var(--primary-color);
    padding: 0.5rem;
    border-radius: 35%;
}

.prompt{
    position: fixed;
    background: var(--primary-color);
    z-index: 1000;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 1rem;
}

.prompt__input-wrapper{
    width: 100%;
    height: 4rem;
    display: flex;
    position: relative;
}

.prompt__form-input{
    height: 100%;
    width: 100%;
    border: none;
    resize: none;
    font-size: 1rem;
    color: var(--text-color);
    padding: 1rem 1.75rem;
    border-radius: 100px;
    background: var(--secondary-color);
    transition: background 0.3s ease;
}

.prompt__form-input:focus{
    background: var(--focus-color);
}

.prompt__form-input:focus ~ .prompt__form-button:hover{
    background: var(--focus-hover-color);
}

.prompt__form-input::placeholder{
    color: var(--placeholder-color);
}

.prompt__form-button{
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    width: 48px;
    height: 48px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    background: transparent;
    transition: all 0.3s ease;
}

.prompt__form-button:hover{
    background: var(--button-hover-color);
}

.prompt__form-button#sendButton{
    transform: translateY(-50%) scale(0);
}

.prompt__form-input:valid ~ .prompt__form-button#sendButton{
    transform: translateY(-50%) scale(1);
}

.prompt__form-input:valid ~ #deleteButton{
    right: 3.5rem;
}

.prompt__disclaim{
    text-align: center;
    color: var(--placeholder-color);
    font-size: 0.85rem;
    margin-top: 1rem;
}

.chats{
    padding: 2rem 1rem 10rem;
    max-height: 100%;
    overflow-y: auto;
    scrollbar-color: #999 transparent;
}

.chats .message--incoming{
    margin-top: 1.5rem;
}

.chats .message--outgoing:not(:first-child){
    margin-top: 40px;
}

.chats .message__content{
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
}



.chats .message__text {
    color: var(--text-color);
    white-space: pre-wrap; /* Allows text to wrap and respects whitespace */
    word-wrap: break-word; /* Breaks long words to prevent overflow */
    margin-top: 10px;
    max-width: 87%; /* Adjusts to 90% of the parent container */
    min-width: 87%; /* Adjusts to 90% of the parent container */
    /* Alternatively, you can use viewport units */
    /* max-width: 80vw; */
}



.hide{
    display: none !important;
}

.chats .message--error .message__text{
    color: #e55865;
}

.chats .message--loading .message__text{
    display: none;
}

.chats .message__avatar{
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    object-fit: top center;
}

.chats .message--loading .message__avatar {
    animation: scaleUpDown 3s ease-in-out infinite;
}

@keyframes scaleUpDown {
    0%, 100% {
        transform: scale(1); /* Normal size */
    }
    50% {
        transform: scale(0.8); /* Smaller size */
    }
}

.chats .message__icon{
    color: var(--text-color);
    cursor: pointer;
    height: 35px;
    width: 35px;
    border-radius: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    font-size: 1.25rem;
    margin-left: 3.5rem;
    transition: background 0.3s ease;
}

.chats .message__icon:hover{
    background: var(--secondary-hover-color);
}

.chats .message__loading-indicator{
    display: none;
    gap: 0.6rem;
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;
}

.chats .message--loading .message__loading-indicator{
    display: flex;
}

.chats .message__loading-indicator .message__loading-bar{
    height: 1rem;
    width: 100%;
    border-radius: 0.135rem;
    background-position: -800px 0;
    background: linear-gradient(to right, #ffffff60 30%, var(--primary-color) 60%, #ffffff60);
    animation: loading 3s linear infinite;
}

.chats .message__loading-indicator .message__loading-bar:first-child{
    width: 85%;
}

.chats .message__loading-indicator .message__loading-bar:last-child{
    width: 70%;
}

@keyframes loading {
    
    0%{
        background-position: -800px 0;
    }
    50%{
        background-position: 0px 0;
    }
    100%{
        background-position: 800px 0;
    }

}

.code__copy-btn{
    background-color: transparent;
    border: none;
    color: var(--text-color);
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
    font-size: 18px;
}

p{
    margin-bottom: 10px;
}

ul{
    list-style: disc inside;
    margin-left: 20px;
}

ol{
    margin-left: 40px;
}

strong{
    font-weight: bold;
}

em{
    font-size: italic;
}

a{
    color: #1e90ff;
    text-decoration: none;
}

th,
td{
    border: 1px solid;
    text-align: left;
    padding: 10px;
}

pre {
    overflow: hidden; /* Ensure the container does not overflow */
}

pre {
    position: relative;
    background-color: var(--secondary-color);
    padding: 10px 0 0;
    font-family: monospace;
    font-size: 14px;
    border-radius: 10px;
    margin: 0;
    overflow-x: auto; /* Allow horizontal scrolling */
    white-space: pre; /* Preserve whitespace and line breaks */
    border: 1px solid var(--border-color);
}


code {
    margin-top: 30px;
    border-radius: 0 0 5px 5px; /* top right and top left are 0, bottom right and bottom left are 5px */
    color: inherit;
}


.code__language-label{
    position: absolute;
    top: 13px;
    left: 13px;
    color: var(--placeholder-color);
    font-size: 14px;
    text-transform: capitalize;
    font-family: ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 0.75rem;
    font-weight: 400;
}

.hljs{
    background-color: var(--code-color);
}

blockquote{
    padding-left: 60px;
    line-height: 2.5rem;
    color: var(--text-color);
}

@media screen and (max-width: 980px) {
    
    .header{
        padding: 0 2rem;
    }

    .header__title{
        line-height: 2.8rem;
    }

    .header__title h1{
        font-size: 2.7rem;
    }

    .header__title h2{
        font-size: 2.5rem;
    }

    .suggests{
        justify-content: center;
    }

    .suggests__item:nth-child(3),
    .suggests__item:nth-child(4){
        display: none;
    }

    .message{
        padding: 0 1.5rem;
    }

    .prompt__disclaim{
        font-size: 0.8rem;
    }

}
