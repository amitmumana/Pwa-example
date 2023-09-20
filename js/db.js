db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    // may be multipale tabs open once
    console.log("persistence failed")
  } else if (err.code == "unimplemented") {
    // lack of browser
    console.log("persistence not avilable")
  }
})

// real-time listener . which will get chages of doc //

db.collection("menu").onSnapshot((items) => {
  items.docChanges().forEach((element) => {
    // console.log(element, element.doc.data(), "hola hola you got snap shot")

    if (element.type === "added") {
      // add the document d
      renderDoc(element.doc.data(), element.doc.id)
    }
    if (element.type === "removed") {
      // remove the document
      removeItem(element.doc.id)
    }
  })
})

// Adding item

const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const items = {
    title: form.title?.value,
    ingredients: form.ingredients.value
  }

  db.collection("menu")
    .add(items)
    .catch((err) => {
      console.log(err, "this is error while adding item to db")
    })

  form.title.value = ""
  form.ingredients.value = ""
})

// deleting item //

const container = document.querySelector(".items")

container.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id")

    db.collection("menu").doc(id).delete()
  }
})
