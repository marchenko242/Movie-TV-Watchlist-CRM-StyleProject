const getData = JSON.parse(localStorage.getItem("userSession")) || [];

function loginUser(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    const userFound = getData.find(user => user.email === emailInput && user.password === passwordInput);

    if (userFound) {
        alert("Login successful! Welcome " + userFound.firstName);
        console.log("Logged in user:", userFound);
        window.location.href = "../../index.html";
    } else {
        alert("Invalid email or password.");
    }

    event.target.reset();
}

document.querySelector("form").addEventListener("submit", loginUser);