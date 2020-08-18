var name = document.getElementById("name");

function printWelcome() {
    if (name = '') {
        alert("Please enter some ToDo")
    }
}


firebase.database().ref('todoapp').on('child_added', function(data) {
    // creating  ul li Element


    var li = document.createElement("li")
    var liText = document.createTextNode(data.val().value)
    li.setAttribute("class", "liText")
    list.appendChild(li)
    li.appendChild(liText)
    input.value = ""



    // Edit Button

    var edit = document.createElement("button");
    var editText = document.createTextNode("Edit");
    edit.appendChild(editText);
    edit.setAttribute("class", "editButton")
    edit.setAttribute("id", data.val().key)
    edit.setAttribute("onclick", "editBtn(this)")


    // Delete Button

    var dlt = document.createElement("button");
    var dltText = document.createTextNode("Delete");
    dlt.appendChild(dltText);
    dlt.setAttribute("class", "dltButton")
    dlt.setAttribute("id", data.val().key)
    dlt.setAttribute("onclick", "dltBtn(this)")

    li.appendChild(edit);
    li.appendChild(dlt);
})


var list = document.getElementById("list");
// console.log(input.value);

// Add item

function addValue() {
    var input = document.getElementById("input");

    // firebase Working

    var database = firebase.database().ref('todoapp');
    var key = database.push().key;
    var todo = {
        value: input.value,
        key: key
    }
    database.child(key).set(todo)

}

function dltBtn(e) {
    firebase.database().ref("todoapp").child(e.id).remove()
    e.parentNode.remove()
        // console.log(e.id)

}

function editBtn(e) {
    var editValue = prompt("Enter edit value", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: editValue,
        key: e.id
    }
    firebase.database().ref("todoapp").child(e.id).set(editTodo)

    e.parentNode.firstChild.nodeValue = editValue;
}

function dltAll() {
    firebase.database().ref("todoapp").remove();
    list.remove();
}