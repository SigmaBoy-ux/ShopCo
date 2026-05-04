const formElement = document.querySelector('.form')
const firstNameElement = document.querySelector('.firstname')
const lastNameElement = document.querySelector('.lastname')
const emailElement = document.querySelector('.email')
const passwordElement = document.querySelector('.password')
const roleElement = document.querySelector('.role')
const submitButton = document.querySelector('.submit')

const API_URL = 'https://shop-co-backend-k5f0.onrender.com'

formElement.addEventListener('submit', handleRegister)

async function handleRegister(event) {
    event.preventDefault()
    disableSubmit()

    const roleValue = roleElement.value.trim()
    const userData = {
        firstName: firstNameElement.value.trim(),
        lastName: lastNameElement.value.trim(),
        email: emailElement.value.trim(),
        password: passwordElement.value.trim(),
        role: roleValue
    }

    const validationError = validateUserData(userData)
    if (validationError) {
        showError(validationError)
        enableSubmit()      
        return
    }

    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            const result = await response.json().catch(() => ({}))
            showError(result.message || 'Serverda xato yuz berdi. Iltimos, qayta urinib koring.')
            enableSubmit()
            return
        }

        showSuccess('Siz muvaffaqiyatli royxatdan otdingiz.')
        clearForm()
    } catch (error) {
        console.error(error)
        showError('Tarmoq bilan boglanishda xato yuz berdi. Keyinroq urinib koring.')
    } finally {
        enableSubmit()
    }
}

function validateUserData({ firstName, lastName, email, password, role }) {
    if (!firstName || !lastName || !email || !password || !role) {
        return 'Barcha maydonlar toldirilishi kerak.'
    }

    if (!email.includes('@') || !email.includes('.')) {
        return 'Iltimos, togri email kiriting.'
    }

    const normalizedRole = role.toLowerCase()
    if (normalizedRole !== 'admin' && normalizedRole !== 'user') {
        return 'Role faqat "admin" yoki "user" bo\'lishi kerak.'
    }

    if (password.length < 6) {
        return 'Parol kamida 6 ta belgidan iborat bolishi kerak.'
    }

    return null
}

function disableSubmit() {
    submitButton.disabled = true
    submitButton.style.opacity = '0.5'
    submitButton.style.cursor = 'not-allowed'
    submitButton.textContent = 'Registering...'
}

function enableSubmit() {
    submitButton.disabled = false
    submitButton.style.opacity = '1'
    submitButton.style.cursor = 'pointer'
    submitButton.textContent = 'Register'
}

function showError(message) {
    iziToast.error({
        title: 'Xato',
        message,
        timeout: 4000,
        position: 'topRight'
    })
}

function showSuccess(message) {
    iziToast.success({
        title: 'Muvaffaqiyat',
        message,
        timeout: 4000,
        position: 'topRight'
    })
}

function clearForm() {
    firstNameElement.value = ''
    lastNameElement.value = ''
    emailElement.value = ''
    passwordElement.value = ''
    roleElement.value = ''
}
