import { z } from "zod";

export const checkoutFormSchema = z.object({
  // Contact
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  
  // Shipping Address
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State / Province is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  
  // Shipping Method
  shippingMethod: z.enum(["standard", "express", "overnight"]),
  
  // Payment Method
  paymentMethod: z.enum(["card", "apple_pay", "klarna"]),
  cardNumber: z.string().refine((val) => val.replace(/\s/g, "").length >= 15, {
    message: "Valid 16-digit card number required",
  }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY required"),
  cardCvc: z.string().regex(/^\d{3,4}$/, "3 or 4 digit CVC required"),
  nameOnCard: z.string().min(2, "Name on card is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export interface OrderDetails {
  orderId: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selectedColor?: string;
    selectedSize?: string;
  }>;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryEst: string;
}
