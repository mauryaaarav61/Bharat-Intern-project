document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        registrationForm.reset();
      } else {
        const errorData = await response.json();
        alert(errorData.error ,"Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(" Registration Error:", error);
      alert("Registration Error. Please try again later.");
    }
  });
  
});
