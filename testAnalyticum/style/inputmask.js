var selector = document.querySelector("input[type='tel']");

var im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);

new JustValidate('.form', {
    rules: {
        name: {
            required: true,
            minLenght: 2,
            maxLenght: 10,
        },

        surname: {
            required: true,
            minLenght: 2,
            maxLenght: 10,
        },
        tel: {
            required: true,
            function: (name, value) => {
                const phone = selector.inputmask.unmaskedvalue()
                return Number(phone) && phone.lenght === 10
            }

        },
        mail: {
            required: true,
            email: true

        },
    },
    messages: {
        name: {
            required: 'Имя - обязательное поле!',
            minLenght: 'Имя должно быть не короче 2 символов',
            maxLenght: 'Имя должно быть не длиннее 10 символов'
        },

        surname: {
            required: 'Фамилия - обязательное поле!'
        },
        mail: {
            required: 'E-mail-Обязательное поле!'

        },
        tel: {
            required: 'Телефон-Обязательное поле!'
        }
    }

});