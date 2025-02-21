// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    { id: 12345678, name: "Alice Johnson", extension: 2345, email: "alice@example.com", department: "HR" },
    { id: 87654321, name: "Bob Smith", extension: 3456, email: "bob@example.com", department: "IT" },
    { id: 11223344, name: "Charlie Brown", extension: 4567, email: "charlie@example.com", department: "Finance" },
    { id: 44332211, name: "Diana Prince", extension: 5678, email: "diana@example.com", department: "Marketing" },
    { id: 55667788, name: "Ethan Hunt", extension: 6789, email: "ethan@example.com", department: "Operations" }
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem("employees")) {
    employees = JSON.parse(localStorage.getItem("employees"));
}

// GET DOM ELEMENTS
const form = document.getElementById("employeeForm");
const empTable = document.getElementById("employeeTable");
const tbody = empTable.querySelector("tbody");
const employeeCount = document.getElementById("employeeCount");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener("submit", (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    const empID = document.getElementById("empID").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const extension = document.getElementById("extension").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = {
        id: parseInt(empID),
        name: fullName,
        extension: parseInt(extension),
        email: email,
        department: department
    };

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById("empID").focus();
});

// DELETE EMPLOYEE
empTable.addEventListener("click", (e) => {
    // CONFIRM THE DELETE
    if (e.target.tagName === "BUTTON") {
        if (confirm("Are you sure you want to delete this employee?")) {

            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex - 1;

            // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(rowIndex, 1);

            // BUILD THE GRID
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    tbody.innerHTML = "";

    // REBUILD THE TBODY FROM SCRATCH
    let newTbody = document.createElement("tbody");

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of employees) {
        let row = newTbody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button class="btn btn-danger btn-sm">X</button></td>
        `;
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.replaceChild(newTbody, tbody);

    // UPDATE EMPLOYEE COUNT
    employeeCount.textContent = `(${employees.length})`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem("employees", JSON.stringify(employees));
}
