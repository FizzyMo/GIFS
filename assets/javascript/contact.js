document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const alertBox = document.getElementById("form-alert");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    fetch("/api/contact-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showAlert("🎉 Thank you! Your message has been sent.", "success");
          form.reset();
        } else {
          showAlert("❌ Something went wrong. Please try again later.", "danger");
        }
      })
      .catch(() => {
        showAlert("❌ Network error. Please try again.", "danger");
      });
  });

  function showAlert(message, type) {
    alertBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }
});