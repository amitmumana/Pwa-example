const notes = document.querySelector(".items")

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu")
  M.Sidenav.init(menus, { edge: "right" })
  // add recipe form
  const forms = document.querySelectorAll(".side-form")
  M.Sidenav.init(forms, { edge: "left" })
})

// render document data //

const renderDoc = (data, id) => {
  const html = `
     <div class="card-panel recipe white row" data-id="${id}">
       <img src="/img/pizza.png" alt="recipe thumb">
        <div class="recipe-details">
         <div class="recipe-title">${data.title}</div>
          <div class="recipe-ingredients">${data.ingredients}</div>
        </div>
        <div class="recipe-delete">
          <i class="material-icons" data-id="${id}">delete_outline</i>
       </div>
     </div>
  `

  notes.innerHTML += html
}

// remove item from DOM //
// .items[data-id=${id} this is attribute selector
// remove() is dom method

const removeItem = (id) => {
  const item = document.querySelector(`.recipe[data-id=${id}]`)
  item.remove()
}
