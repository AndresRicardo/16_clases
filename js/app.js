create_form = document.querySelector("#create_form");
roleSelect = document.querySelector("#roleSelect");
reg_name = document.querySelector("#reg_name");
reg_age = document.querySelector("#reg_age");
createButton = document.querySelector("#createButton");
regs = document.querySelector("#regs");

let studentsArray = [];
let teachersArray = [];

class persona {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class student extends persona {
    constructor(name, age, approved = false, id) {
        super(name, age);

        this.role = "student";
        this.approved = approved || false;
        approved ? (this.status = "Approved") : (this.status = "Reprovate");
        this.id = id;
    }
}
class teacher extends persona {
    constructor(name, age, plant = false, id) {
        super(name, age);
        this.role = "teacher";
        this.plant = plant;
        plant
            ? (this.status = "Plant teacher")
            : (this.status = "Occasional teacher");
        this.id = id;
    }
}

function addStudent(name, age, approved = false) {
    newStudent = new student(name, age, approved, studentsArray.length + 1);
    studentsArray.push(newStudent);

    studentsTemplate = document.querySelector("#studentsTemplate").content;
    clone = studentsTemplate.cloneNode(true);

    clone.querySelector(".studentName").textContent =
        newStudent.name.toUpperCase();

    clone.querySelector(".id").dataset.id = newStudent.id;
    clone.querySelector(".id").textContent = `Id: S${newStudent.id}`;

    clone.querySelector(".age").dataset.age = newStudent.age;
    clone.querySelector(".age").textContent = `${newStudent.age} Years old`;

    clone.querySelector(".studentState").dataset.status = newStudent.status;
    clone.querySelector(".studentState").textContent = newStudent.status;

    fragmento = document.createDocumentFragment();
    fragmento.appendChild(clone.querySelector(".studentCard"));
    regs.querySelector("#students").appendChild(fragmento);
}

function addTeacher(name, age, plant = false) {
    newTeacher = new teacher(name, age, plant, teachersArray.length + 1);
    teachersArray.push(newTeacher);

    teachersTemplate = document.querySelector("#teachersTemplate").content;
    clone = teachersTemplate.cloneNode(true);

    clone.querySelector(".teacherName").textContent =
        newTeacher.name.toUpperCase();

    clone.querySelector(".id").dataset.id = newTeacher.id;
    clone.querySelector(".id").textContent = `Id: T${newTeacher.id}`;

    clone.querySelector(".age").dataset.age = newTeacher.age;
    clone.querySelector(".age").textContent = `${newTeacher.age} Years old`;

    clone.querySelector(".teacherState").dataset.status = newTeacher.plant;
    clone.querySelector(".teacherState").textContent = newTeacher.status;

    fragmento = document.createDocumentFragment();
    fragmento.appendChild(clone.querySelector(".teacherCard"));
    regs.querySelector("#teachers").appendChild(fragmento);
}

function deleteStudent(event) {
    card = event.target.parentElement.parentElement;

    // si se da click en una tarjeta de estudiante
    if (card.classList.contains("studentCard")) {
        // obtener el id del estudiante
        id = card.querySelector(".id").dataset.id;
        console.log("id a eliminar: " + id);
        //eliminar el estudiante del registro
        studentsArray.forEach((element) => {
            if (element.id == id) {
                console.log("id a eliminar: " + id);
                studentsArray.splice(studentsArray.indexOf(element), 1);
            }
        });
        //eliminar card
        card.parentElement.removeChild(card);
    }
}

function deleteTeacher(event) {
    console.log("click en boton Delete");
    card = event.target.parentElement.parentElement;

    // si se da click en una tarjeta de teacher
    if (card.classList.contains("teacherCard")) {
        card.parentElement.removeChild(card);
        // obtener el id del teacher
        id = card.querySelector(".id").dataset.id;
        console.log("id a eliminar: " + id);
        //eliminar el teacher del registro
        teachersArray.forEach((element) => {
            if (element.id == id) {
                console.log("id a eliminar: " + id);
                teachersArray.splice(teachersArray.indexOf(element), 1);
            }
        });
    }
}

function updateStudentButtons(card) {
    //deshabilitar boton aprobar
    card.querySelector(".cardButtons .cardButtonAprobar").classList.toggle(
        "disabled"
    );
    //habilitar boton reprobar
    card.querySelector(".cardButtons .cardButtonReprobar").classList.toggle(
        "disabled"
    );
}

function approveStudent(event) {
    console.log("click en boton Approve");
    card = event.target.parentElement.parentElement;

    // si se da click en una tarjeta de estudiante
    if (card.classList.contains("studentCard")) {
        studentState = card.querySelector(".cardHead .studentState");

        //cambiar dataset.status
        studentState.dataset.status = "Approved";
        //cambiar texto del elemento
        studentState.textContent = studentState.dataset.status;
        updateStudentButtons(card);
    }
}

function reprobateStudent(event) {
    console.log("click en boton Reprobate");
    card = event.target.parentElement.parentElement;

    // si se da click en una tarjeta de estudiante
    if (card.classList.contains("studentCard")) {
        studentState = card.querySelector(".cardHead .studentState");

        //cambiar dataset.status
        studentState.dataset.status = "Reprobate";
        //cambiar texto del elemento
        studentState.textContent = studentState.dataset.status;
        updateStudentButtons(card);
    }
}

createButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (roleSelect.value === "Student") {
        addStudent(reg_name.value, reg_age.value, false);
    } else {
        addTeacher(reg_name.value, reg_age.value, false);
    }
});

document.addEventListener("click", (event) => {
    // click en boton aprobarStudent
    if (event.target.classList.contains("cardButtonAprobar")) {
        approveStudent(event);
    }
    // click en boton reprobarStudent
    if (event.target.classList.contains("cardButtonReprobar")) {
        reprobateStudent(event);
    }
    // click en boton deleteStudent
    if (event.target.classList.contains("cardButtonEliminar")) {
        deleteStudent(event);
    }
    // click en boton deleteTeacher
    if (event.target.classList.contains("cardButtonEliminar")) {
        deleteTeacher(event);
    }
});
