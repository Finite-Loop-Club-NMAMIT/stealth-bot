function typeWriterEffect(id, text, speed) {
    const element = document.getElementById(id);
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

window.onload = function() {
    typeWriterEffect("title", "Hello, I am Stealth Bot", 50);
    typeWriterEffect("text2", "A Fully Anonymous Chatbot for Your Discord Server", 50);
};
