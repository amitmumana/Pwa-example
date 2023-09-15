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
    }
  })
})
