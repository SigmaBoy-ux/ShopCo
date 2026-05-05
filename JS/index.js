document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".newsletter__form");
    const submitButton = form ? form.querySelector(".newsletter__button") : null;

    if (form && submitButton) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput = form.querySelector(".name");
            const phoneInput = form.querySelector(".phone");
            const messageInput = form.querySelector(".message");

            const name = nameInput ? nameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !phone || !message) {
                Swal.fire({
                    title: "Xato",
                    text: "Iltimos, barcha maydonlarni to'ldiring",
                    icon: "warning"
                });
                return;
            }

            disableSubmit(submitButton);


            const token = "8701359703:AAHOEcQhapD469wJfU84wZ5Mec4VRL6CmOw";
            const chat_id = "5964694487";
            const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

            const text = `📩 *Yangi ariza!*
            \n\n👤 Ism: *${name}*
            \n📞 Tel: *${phone}*
            \n📄 Xabar: *${message}*
            \n\n🕒 Vaqt: ${new Date().toLocaleString()}`;

            fetch(telegramUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chat_id,
                    text: text,
                    parse_mode: "Markdown"
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        Swal.fire({
                            title: "Yuborildi",
                            text: "Xabar muvaffaqiyatli jo'natildi",
                            icon: "success"
                        });
                        form.reset();
                    }
                })
                .catch(error => {
                    console.error("Xatolik:", error);
                    Swal.fire({
                        title: "Xatolik",
                        text: "Xabarni yuborishda muammo yuz berdi",
                        icon: "error"
                    });
                })
                .finally(() => {
                    enableSubmit(submitButton);
                });
        });
    }
});

function disableSubmit(btn) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
    btn.textContent = 'Loading...';
}

function enableSubmit(btn) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.textContent = 'Submit';
}