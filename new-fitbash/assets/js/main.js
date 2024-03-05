/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data , .footer__container, .footer__group`)
sr.reveal(`.home__img`, { delay: 700, origin: 'bottom' })
sr.reveal(`.logos__img, .program__card , .pricing__card`, { interval: 100 })
sr.reveal(`.choose__img , .calculate__content`, { origin: 'right' })
sr.reveal(`.choose__content , .calculate__img`, { origin: 'left' })

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate-message')

const radioButtons = document.querySelectorAll('.gender');
let lastSelectedValue = null;

function setupRadioButtons() {
    var prev = null;
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', function () {
            (prev) ? prev.value : null;
            if (this !== prev) {
                prev = this;
                lastSelectedValue = this.value;
            }
            // console.log(lastSelectedValue);
        });
    }
}
// Call the setup function to set up the event listeners
setupRadioButtons();


const calculateBmi = (e) => {
    e.preventDefault()

    // Check if the fields have a value
    if (calculateCm.value === '' || calculateKg.value === '') {
        // Add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        // Show message
        calculateMessage.textContent = 'قد و وزن خود را وارد کنید👨🏻‍💻'
        // Remove message three seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 3000)

    } else {

        // let selectedValue

        // function handleRadioChange() {
        //     // Iterate through the radio buttons to find the checked one
        //     radioButtons.forEach(radioButton => {
        //         if (radioButton.checked) {
        //             selectedValue = radioButton.value;
        //         }
        //     });
        // }

        // // Add event listeners to each radio button to detect changes
        // radioButtons.forEach(radioButton => {
        //     radioButton.addEventListener('change', handleRadioChange);
        // });

        const cm = calculateCm.value,
            kg = calculateKg.value



        //Chat-GPT Message

        // API key
        const apiKey = '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';

        // Define the function to handle API response and update the HTML
        function handleApiResponse(response) {

            // Extract the content from the API response
            const content = response.choices[0].message.content;

            // Update the HTML with the API response
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = content;
        }

        // Define the main function to make the API call
        async function generatedAnswer() {

            // Import 'openai'
            const openaiModule = await import('https://cdn.skypack.dev/openai');
            const { OpenAI } = openaiModule;

            // Create an instance of OpenAI
            const openai = new OpenAI({
                apiKey: apiKey,
                language: 'fa',
                dangerouslyAllowBrowser: true,
            });

            // Make the API call
            openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: `من اطلاعات ویژگی‌های جسمی خودم را با اندازه وزن ${kg} کیلوگرم و قد ${cm} سانتی‌متر ارائه می‌دهم. در انتظار یک پاسخ هوش مصنوعی هستم که تنها با یک اجرا، به صورت هوشمندانه نام و بیوگرافی کوتاه یک شخصیت تاریخی ${lastSelectedValue} را با ابراز تحسین به من ارائه دهد.` },
                ],
            }).then(handleApiResponse);
        }
        // Call the main function when the script is loaded
        generatedAnswer();

        // To clear the input field
        calculateCm.value = ''
        calculateKg.value = ''

        // Remove message four seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 70000)
    }
}


calculateForm.addEventListener('submit', calculateBmi)


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user')

const sendEmail = (e) => {
    e.preventDefault()

    // Check if the field has a value
    if (contactUser.value === '') {
        // Add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        // Show message
        contactMessage.textContent = 'باید ایمیل خود را وارد کنید 👆🏻'

        // Remove message three seconds
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 3000)
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_m10nae3', 'template_ew0ebbn', '#contact-form', 'd9_hwYXOCrCF5wDoF')
            .then(() => {
                // Show message and add color
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'با موفقیت انجام شد 💪'

                // Remove message after three seconds
                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) => {
                // Mail sending error
                alert('اوپس! انگار یه مشکلی پیش اومده....', error)
            })

        // To clear the input field
        contactUser.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail)