document.querySelectorAll(`.simple__item`).forEach(function(simpleBtn) {
    simpleBtn.addEventListener(`click`, function(event) {
        const path = event.currentTarget.dataset.path
        console.log(path)

        document.querySelectorAll(`.tab-content`).forEach(function(tabContent) {
            tabContent.classList.remove(`tab-content-active`)
        })
        document.querySelector(`[data-target="${path}"]`).classList.add(`tab-content-active`)
    })

})

document.querySelectorAll(`.integrates__item`).forEach(function(integratesBtn) {
    integratesBtn.addEventListener(`click`, function(event) {
        const path = event.currentTarget.dataset.path
        console.log(path)

        document.querySelectorAll(`.integrates-content`).forEach(function(integratesContent) {
            integratesContent.classList.remove(`integrates-content-active`)
        })
        document.querySelector(`[data-target="${path}"]`).classList.add(`integrates-content-active`)
    })

})