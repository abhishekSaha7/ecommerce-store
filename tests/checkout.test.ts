import { describe, it, expect } from "vitest";
import { checkoutFormSchema } from "@/types/checkout";

describe("Checkout Zod Schema Validation", () => {
  it("should validate a complete, correct checkout form payload", () => {
    const validData = {
      email: "elena.rostova@design.com",
      phone: "+15551234567",
      firstName: "Elena",
      lastName: "Rostova",
      address: "100 Architectural Way",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      shippingMethod: "standard",
      paymentMethod: "card",
      cardNumber: "4532890123456789",
      cardExpiry: "08/28",
      cardCvc: "492",
      nameOnCard: "Elena Rostova",
    };

    const result = checkoutFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation on invalid email address", () => {
    const invalidData = {
      email: "invalid-email-string",
      phone: "12345678",
      firstName: "Elena",
      lastName: "Rostova",
      address: "100 Architectural Way",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      shippingMethod: "standard",
      paymentMethod: "card",
      cardNumber: "4532890123456789",
      cardExpiry: "08/28",
      cardCvc: "492",
      nameOnCard: "Elena Rostova",
    };

    const result = checkoutFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("should fail validation on invalid card expiry format", () => {
    const invalidData = {
      email: "test@example.com",
      phone: "12345678",
      firstName: "Elena",
      lastName: "Rostova",
      address: "100 Architectural Way",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      shippingMethod: "standard",
      paymentMethod: "card",
      cardNumber: "4532890123456789",
      cardExpiry: "2028-12", // Should be MM/YY format
      cardCvc: "492",
      nameOnCard: "Elena Rostova",
    };

    const result = checkoutFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.cardExpiry).toBeDefined();
    }
  });
});
