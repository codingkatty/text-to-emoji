document.addEventListener('DOMContentLoaded', () => {
    const inputTextarea = document.getElementById('input');
    const outputTextarea = document.getElementById('output');
    let timeoutId;

    inputTextarea.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            translateToEmoji(inputTextarea.value);
        }, 500);
    });

    async function translateToEmoji(text) {
        if (!text.trim()) {
            outputTextarea.value = '';
            return;
        }

        outputTextarea.value = '✨ Translating...';
        
        try {
            const response = await fetch("https://pirate-ai.onrender.com/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: `Convert this text to emojis only, no words or punctuation: "${text}"`
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const emojiOnly = data.response.replace(/[^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])]/g, '');
            outputTextarea.value = emojiOnly || '❓ No emojis found';

        } catch (error) {
            console.error("Error:", error);
            outputTextarea.value = '❌ Error converting text to emoji';
        }
    }
});