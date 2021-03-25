
    document.querySelectorAll(`.howe_item`).forEach(function(howeBtn){
        howeBtn.addEventListener(`click`, function(event) {
         const path = event.currentTarget.dataset.path
         console.log(path)

         document.querySelectorAll(`.tab-content`).forEach(function(tabContent){
             tabContent.classList.remove(`tab-content-active`)
         })
         document.querySelector(`[data-target="${path}"]`).classList.add(`tab-content-active`)
        })

    })
