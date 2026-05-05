document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".newsletter__form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();


            const emailInput = form.querySelector(".newsletter__input");
            const email = emailInput ? emailInput.value.trim() : "";

            if (!email) {
                Swal.fire({
                    title: "Xato",
                    text: "Iltimos, email manzilingizni kiriting",
                    icon: "warning"
                });
                return;
            }

            const token = "8701359703:AAHOEcQhapD469wJfU84wZ5Mec4VRL6CmOw";
            const chat_id = "5964694487";
            const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;


            const text = `📩 *Yangi ariza!*\n\n✉️ Email: *${email}*`;

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
                    } else {
                        throw new Error(data.description);
                    }
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        title: "Xatolik",
                        text: "Xabarni yuborishda muammo yuz berdi",
                        icon: "error"
                    });
                });
        });
    }
});