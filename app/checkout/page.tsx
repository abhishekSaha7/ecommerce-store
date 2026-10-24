"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormData } from "@/types/checkout";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartShippingFee,
  selectCartEstimatedTax,
  selectCartGrandTotal,
} from "@/features/cart/selectors";
import { clearCart } from "@/features/cart/cartSlice";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Check, ShieldCheck, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const shippingFee = useAppSelector(selectCartShippingFee);
  const tax = useAppSelector(selectCartEstimatedTax);
  const grandTotal = useAppSelector(selectCartGrandTotal);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "alexander.vance@design.co",
      phone: "+1 (555) 234-5678",
      firstName: "Alexander",
      lastName: "Vance",
      address: "742 Evergreen Terrace",
      apartment: "Suite 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
      shippingMethod: "standard",
      paymentMethod: "card",
      cardNumber: "4532 8901 2345 6789",
      cardExpiry: "12/28",
      cardCvc: "892",
      nameOnCard: "Alexander Vance",
    },
  });

  const formValues = watch();

  if (items.length === 0 && step < 4) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">No Items to Checkout</h1>
        <p className="text-xs text-muted-foreground">Your shopping bag is empty.</p>
        <Link href="/shop">
          <Button variant="outline">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  // Validate step 1 fields before proceeding to step 2
  const nextStep1 = async () => {
    const valid = await trigger(["email", "phone", "firstName", "lastName"]);
    if (valid) setStep(2);
  };

  // Validate step 2 fields before proceeding to step 3
  const nextStep2 = async () => {
    const valid = await trigger(["address", "city", "state", "postalCode", "country", "shippingMethod"]);
    if (valid) setStep(3);
  };

  // Validate step 3 fields before proceeding to step 4
  const nextStep3 = async () => {
    const valid = await trigger(["cardNumber", "cardExpiry", "cardCvc", "nameOnCard"]);
    if (valid) setStep(4);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    // Simulate payment API processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const orderId = `NOVA-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderSummary = {
      orderId,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0],
        selectedColor: i.selectedColor,
        selectedSize: i.selectedSize,
      })),
      subtotal,
      discount,
      shippingFee,
      total: grandTotal,
      shippingAddress: {
        name: `${data.firstName} ${data.lastName}`,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
      deliveryEst: "3-5 Business Days",
    };

    // Store completed order in localStorage for confirmation screen
    if (typeof window !== "undefined") {
      window.localStorage.setItem("nova_latest_order", JSON.stringify(orderSummary));
    }

    dispatch(clearCart());
    toast.success("Order Placed Successfully!");
    router.push("/order-success");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold uppercase tracking-wider">
          <div className={`flex items-center space-x-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              1
            </span>
            <span className="hidden sm:inline">Contact</span>
          </div>

          <div className="h-px bg-border flex-1 mx-4" />

          <div className={`flex items-center space-x-2 ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              2
            </span>
            <span className="hidden sm:inline">Delivery</span>
          </div>

          <div className="h-px bg-border flex-1 mx-4" />

          <div className={`flex items-center space-x-2 ${step >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              3
            </span>
            <span className="hidden sm:inline">Payment</span>
          </div>

          <div className="h-px bg-border flex-1 mx-4" />

          <div className={`flex items-center space-x-2 ${step >= 4 ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              4
            </span>
            <span className="hidden sm:inline">Review</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Multi-step Form Inputs */}
        <div className="lg:col-span-7 bg-card border border-border p-6 sm:p-8 space-y-8">
          {/* STEP 1: Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold">1. Contact Details</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  We will send order confirmation and tracking details to this email.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <Input
                    label="Last Name"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="button" onClick={nextStep1} className="flex items-center space-x-2">
                  <span>Continue to Delivery</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery & Address */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold">2. Shipping Address & Freight</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your destination address for white-glove insured delivery.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Street Address"
                  error={errors.address?.message}
                  {...register("address")}
                />
                <Input
                  label="Apartment, Suite, etc. (Optional)"
                  {...register("apartment")}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    error={errors.city?.message}
                    {...register("city")}
                  />
                  <Input
                    label="State / Province"
                    error={errors.state?.message}
                    {...register("state")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Postal Code"
                    error={errors.postalCode?.message}
                    {...register("postalCode")}
                  />
                  <Input
                    label="Country"
                    error={errors.country?.message}
                    {...register("country")}
                  />
                </div>

                {/* Shipping Method Options */}
                <div className="pt-4 space-y-3">
                  <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground block">
                    Select Shipping Method:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between border border-border p-3 cursor-pointer hover:border-foreground transition-colors">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          value="standard"
                          {...register("shippingMethod")}
                          className="h-4 w-4 text-primary focus:ring-ring"
                        />
                        <div className="text-xs">
                          <span className="font-bold uppercase tracking-wider block">Standard White-Glove</span>
                          <span className="text-muted-foreground">3-5 business days</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold">
                        {shippingFee === 0 ? "FREE" : "$15.00"}
                      </span>
                    </label>

                    <label className="flex items-center justify-between border border-border p-3 cursor-pointer hover:border-foreground transition-colors">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          value="express"
                          {...register("shippingMethod")}
                          className="h-4 w-4 text-primary focus:ring-ring"
                        />
                        <div className="text-xs">
                          <span className="font-bold uppercase tracking-wider block">Priority Express</span>
                          <span className="text-muted-foreground">1-2 business days</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold">$35.00</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back</span>
                </Button>
                <Button type="button" onClick={nextStep2} className="flex items-center space-x-2">
                  <span>Continue to Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold">3. Payment Information</h2>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Lock className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>All transactions are 256-bit SSL encrypted & secure simulated checkout.</span>
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Cardholder Name"
                  error={errors.nameOnCard?.message}
                  {...register("nameOnCard")}
                />
                <Input
                  label="Card Number"
                  placeholder="4532 8901 2345 6789"
                  error={errors.cardNumber?.message}
                  {...register("cardNumber")}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiration (MM/YY)"
                    placeholder="12/28"
                    error={errors.cardExpiry?.message}
                    {...register("cardExpiry")}
                  />
                  <Input
                    label="CVC / CVV"
                    placeholder="892"
                    error={errors.cardCvc?.message}
                    {...register("cardCvc")}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back</span>
                </Button>
                <Button type="button" onClick={nextStep3} className="flex items-center space-x-2">
                  <span>Review Order</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Place Order */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold">4. Final Order Review</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Please confirm your delivery address and payment authorization before placing your order.
                </p>
              </div>

              {/* Review Summary Card */}
              <div className="space-y-4 text-xs bg-muted/40 border border-border p-4">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-semibold text-muted-foreground uppercase">Recipient:</span>
                  <span className="font-bold text-foreground">
                    {formValues.firstName} {formValues.lastName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-semibold text-muted-foreground uppercase">Contact Email:</span>
                  <span>{formValues.email}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="font-semibold text-muted-foreground uppercase">Delivery Destination:</span>
                  <span>
                    {formValues.address}, {formValues.city}, {formValues.state} {formValues.postalCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-muted-foreground uppercase">Payment Card:</span>
                  <span>•••• •••• •••• {formValues.cardNumber?.slice(-4) || "6789"}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Edit Payment</span>
                </Button>
                <Button type="submit" isLoading={isSubmitting} size="lg" className="px-8">
                  <Check className="mr-2 h-4 w-4" />
                  <span>Confirm & Place Order ({formatCurrency(grandTotal)})</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="lg:col-span-5 bg-card border border-border p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <h3 className="font-serif text-xl font-bold">Order Summary</h3>
            <span className="text-xs text-muted-foreground font-sans">({items.length} Items)</span>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1 divide-y divide-border/40">
            {items.map((item, idx) => (
              <div key={idx} className="pt-3 flex space-x-3 text-xs">
                <div className="relative h-16 w-14 bg-muted shrink-0 border border-border">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-bold font-serif line-clamp-1">{item.product.name}</span>
                  <span className="text-muted-foreground text-[11px]">Qty: {item.quantity}</span>
                </div>
                <span className="font-semibold self-center">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 text-xs border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold-600 dark:text-gold-400">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Freight Shipping</span>
              <span>{shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax (8%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-border pt-3">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-muted-foreground flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-gold-500 shrink-0" />
            <span>Guaranteed white-glove arrival with full loss & transit insurance.</span>
          </div>
        </div>
      </form>
    </div>
  );
}
