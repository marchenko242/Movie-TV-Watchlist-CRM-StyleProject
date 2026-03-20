const userList = JSON.parse(localStorage.getItem("userSession")) || [];

function saveUsers(event) {
    event.preventDefault();

    const dataOfUser = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value
    };

    if (dataOfUser.password !== dataOfUser.confirmPassword) {
        alert("Passwords are not equal!");
        return;
    }

    if (!dataOfUser.email.includes("@")) {
        alert("Invalid email!");
        return;
    }

    if (userList.some(u => u.email === dataOfUser.email)) {
        alert("Email already exists.")
        return;
    }


    userList.push(dataOfUser);
    localStorage.setItem("userSession", JSON.stringify(userList));

    event.target.reset();

}

document.querySelector("form").addEventListener("submit", saveUsers);