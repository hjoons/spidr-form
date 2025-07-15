import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Interest Form</CardTitle>
        <CardDescription>
          Fill out this form to show your interest and guess the air fryer's
          cost!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              maxLength={14}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guess">Guess the Air Fryer's Cost ($)</Label>
            <Input
              id="guess"
              name="guess"
              type="number"
              value={formData.guess}
              onChange={handleChange}
              placeholder="Enter your guess"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spidrPin">SPIDR Pin (16 digits)</Label>
            <Input
              id="spidrPin"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handleChange}
              placeholder="1234-5678-9012-3456"
              maxLength={19}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InterestForm;
