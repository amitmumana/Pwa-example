// real-time listener . which will get chages of doc //
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    // may be multipale tabs open once
    console.log("persistence failed")
  } else if (err.code == "unimplemented") {
    // lack of browser
    console.log("persistence not avilable")
  }
})

db.collection("menu").onSnapshot((items) => {
  items.docChanges().forEach((element) => {
    // console.log(element, element.doc.data(), "hola hola you got snap shot")

    if (element.type === "added") {
      // add the document d
      renderDoc(element.doc.data(), element.doc.id)
    }
    if (element.type === "removed") {
      // remove the document
    }
  })
})

var title = document.getElementById("title")
var ingredients = document.getElementById("ingredients")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  console.log(title.value)
  console.log(ingredients.value)

  const recipe = {
    // title: title,
    // ingredients: ingredients
  }

  // db.collection("menu")
  //   .add(recipe)
  //   .catch((err) => console.log(err, "this is error while adding doc"))

  title = ""
  ingredients = ""
})
