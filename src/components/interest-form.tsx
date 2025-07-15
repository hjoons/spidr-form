import React, { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  guess: number;
  spidrPin: string;
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  guess: 0,
  spidrPin: "",
};

const InterestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return digits;

    const [, area, exchange, number] = match;
    if (number) return `(${area}) ${exchange}-${number}`;
    if (exchange) return `(${area}) ${exchange}`;
    if (area) return `(${area}`;
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "spidrPin") {
      // Format SPIDR PIN as ####-####-####-####
      const digitsOnly = value.replace(/\D/g, "");
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1-");
      setFormData({ ...formData, [name]: formatted });
    } else if (name === "phoneNumber") {
      // Format phone number as (###) ###-####
      const formatted = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formatted });
    } else if (name === "guess") {
      // Prevent more than 2 decimal places for currency
      const decimalRegex = /^\d*\.?\d{0,2}$/;
      if (decimalRegex.test(value) || value === "") {
        // Allow empty string to clear the field, otherwise parse as number
        const numericValue = value === "" ? 0 : parseFloat(value);
        setFormData({ ...formData, [name]: numericValue });
      }
      // If it doesn't match the pattern, don't update the state (prevents typing)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="spidr-form-container">
      <div className="spidr-form-card">
        <h1 className="spidr-form-title">Interest Form</h1>
        <p className="spidr-form-description">
          Fill out this form to show your interest and guess the air fryer's
          cost!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="spidr-form-row">
            <div className="spidr-form-group">
              <label htmlFor="firstName" className="spidr-form-label">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                className="spidr-form-input"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="spidr-form-group">
              <label htmlFor="lastName" className="spidr-form-label">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                className="spidr-form-input"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="spidr-form-group">
            <label htmlFor="phoneNumber" className="spidr-form-label">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="spidr-form-input"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="(555) 555-5555"
              maxLength={14}
              required
            />
          </div>

          <div className="spidr-form-group">
            <label htmlFor="email" className="spidr-form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="spidr-form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="spidr-form-group">
            <label htmlFor="guess" className="spidr-form-label">
              Guess the Air Fryer's Cost ($)
            </label>
            <input
              id="guess"
              name="guess"
              type="number"
              className="spidr-form-input"
              value={formData.guess === 0 ? "" : formData.guess}
              onChange={handleChange}
              placeholder="Enter your guess"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="spidr-form-group">
            <label htmlFor="spidrPin" className="spidr-form-label">
              SPIDR Pin (16 digits)
            </label>
            <input
              id="spidrPin"
              name="spidrPin"
              className="spidr-form-input"
              value={formData.spidrPin}
              onChange={handleChange}
              placeholder="1234-5678-9012-3456"
              maxLength={19}
              required
            />
          </div>

          <button type="submit" className="spidr-form-button">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterestForm;
