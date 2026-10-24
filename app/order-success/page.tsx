"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, Truck, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

interface SavedOrder {
  orderId: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
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

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("nova_latest_order");
      if (saved) {
        try {
          setOrder(JSON.parse(saved));
        } catch (e) {
          console.error("Error reading saved order:", e);
        }
      }
    }
  }, []);

  const dummyOrder: SavedOrder = {
    orderId: "NOVA-849201",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    items: [
      {
        id: "nova-01",
        name: "Kiyomi Sculpted Lounge Chair",
        price: 1850,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
      },
    ],
    subtotal: 1850,
    discount: 0,
    shippingFee: 0,
    total: 1998,
    shippingAddress: {
      name: "Alexander Vance",
      address: "742 Evergreen Terrace",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
    },
    deliveryEst: "3-5 Business Days",
  };

  const displayOrder = order || dummyOrder;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-center sm:text-left">
      {/* Animated Success Badge */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20"
        >
          <CheckCircle2 className="h-10 w-10" />
        </motion.div>

        <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold block">
          Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Thank you for your order.
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
          Order number <strong className="text-foreground">{displayOrder.orderId}</strong> has been received and is being prepared by our Kyoto master craftsman studio.
        </p>
      </div>

      {/* Main Order Details Card */}
      <div className="bg-card border border-border p-6 sm:p-8 space-y-8 text-xs">
        {/* Header Status */}
        <div className="flex flex-col sm:flex-row justify-between border-b border-border pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-muted-foreground uppercase font-semibold">Order ID</span>
            <p className="font-bold text-sm text-foreground">{displayOrder.orderId}</p>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground uppercase font-semibold">Order Date</span>
            <p className="font-semibold text-foreground">{displayOrder.date}</p>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground uppercase font-semibold flex items-center">
              <Truck className="h-3.5 w-3.5 mr-1 text-gold-500" />
              <span>Estimated Delivery</span>
            </span>
            <p className="font-bold text-gold-600 dark:text-gold-400 text-sm">{displayOrder.deliveryEst}</p>
          </div>
        </div>

        {/* Itemized Purchased Products */}
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-foreground">Purchased Items</h3>
          <div className="divide-y divide-border">
            {displayOrder.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-14 bg-muted border border-border shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-sm text-foreground">{item.name}</p>
                    <p className="text-muted-foreground text-[11px]">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-sm">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border pt-6">
          <div className="space-y-2">
            <h4 className="font-semibold uppercase tracking-wider text-muted-foreground">
              Shipping Address
            </h4>
            <p className="font-semibold">{displayOrder.shippingAddress.name}</p>
            <p className="text-muted-foreground">
              {displayOrder.shippingAddress.address}, {displayOrder.shippingAddress.city},{" "}
              {displayOrder.shippingAddress.state} {displayOrder.shippingAddress.postalCode}
            </p>
          </div>

          <div className="space-y-1 text-right sm:text-right">
            <div className="flex justify-between sm:justify-end gap-6 text-muted-foreground">
              <span>Subtotal:</span>
              <span>{formatCurrency(displayOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between sm:justify-end gap-6 text-muted-foreground">
              <span>Freight Shipping:</span>
              <span>{displayOrder.shippingFee === 0 ? "FREE" : formatCurrency(displayOrder.shippingFee)}</span>
            </div>
            <div className="flex justify-between sm:justify-end gap-6 font-bold text-sm text-foreground pt-2 border-t border-border/40">
              <span>Total Paid:</span>
              <span>{formatCurrency(displayOrder.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link href="/shop">
          <Button size="lg" className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2">
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/account">
          <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2">
            <Package className="h-4 w-4" />
            <span>View Account Orders</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
