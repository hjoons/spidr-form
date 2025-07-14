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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Guess the Air Fryer's Cost ($)</label>
        <input name="guess" value={formData.guess} onChange={handleChange} />
      </div>
      <div>
        <label>Pin</label>
        <input
          name="spidrPin"
          value={formData.spidrPin}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default InterestForm;
