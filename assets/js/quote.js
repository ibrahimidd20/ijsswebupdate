// ====== Quote Form Handling ======
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");

  // Helper: Validate email format
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Helper: Validate phone format (10–15 digits, optional +, spaces, dashes, parentheses)
  const isValidPhone = (phone) => {
    const re = /^\+?[\d\s\-()]{10,20}$/;
    return re.test(phone);
  };

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    const urgency = form.urgency.value;
    const details = form.details.value.trim();

    // Simple validation
    if (!name || !email || !phone || !service || !urgency || !details) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Please enter a valid mobile phone number.");
      return;
    }

    const quoteData = {
      id: Date.now(),
      name,
      email,
      phone,
      service,
      urgency,
      details,
      date: new Date().toLocaleString(),
    };

    try {
      // ====== 1️⃣ Send to email / API ======
      const response = await fetch("https://formspree.io/f/mwpgjelk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: quoteData.name,
          email: quoteData.email,
          phone: quoteData.phone,
          service: quoteData.service,
          urgency: quoteData.urgency,
          message: quoteData.details,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request. Please try again.");
      }

      // ====== 2️⃣ Store locally for admin dashboard ======
      let storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
      storedQuotes.push(quoteData);
      localStorage.setItem("quotes", JSON.stringify(storedQuotes));

      alert("Your Quote Request Has Been Submitted Successfully! A Representative Will Be in Touch Soon. Thank You.");

      // Reset form
      form.reset();
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  });
});
