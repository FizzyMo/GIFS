document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const alertBox = document.getElementById("form-alert");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        showAlert("🎉 Your message was sent successfully!", "success");
        form.reset();
      } else {
        showAlert("❌ Failed to send. Please try again later.", "danger");
      }
    } catch {
      showAlert("❌ Network error. Please try again.", "danger");
    }
  });

  function showAlert(message, type) {
    alertBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }
});
