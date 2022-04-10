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

    clone.querySelector(".id").dataset.age = newStudent.id;
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

    clone.querySelector(".id").dataset.age = newTeacher.id;
    clone.querySelector(".id").textContent = `Id: T${newTeacher.id}`;

    clone.querySelector(".age").dataset.age = newTeacher.age;
    clone.querySelector(".age").textContent = `${newTeacher.age} Years old`;

    clone.querySelector(".teacherState").dataset.status = newTeacher.plant;
    clone.querySelector(".teacherState").textContent = newTeacher.status;

    fragmento = document.createDocumentFragment();
    fragmento.appendChild(clone.querySelector(".teacherCard"));
    regs.querySelector("#teachers").appendChild(fragmento);
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

// document.addEventListener("click", (event) => {
//     console.log(event.target);
// });
