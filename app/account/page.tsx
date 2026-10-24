"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Bell, Shield, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses" | "preferences">("profile");

  const [profileForm, setProfileForm] = useState({
    name: "Alexander Vance",
    email: "alexander.vance@design.co",
    phone: "+1 (555) 234-5678",
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const mockOrders = [
    {
      id: "NOVA-849201",
      date: "August 20, 2026",
      status: "Delivered",
      total: 1998.0,
      itemCount: 1,
      mainItem: "Kiyomi Sculpted Lounge Chair",
    },
    {
      id: "NOVA-719304",
      date: "June 14, 2026",
      status: "Delivered",
      total: 690.0,
      itemCount: 1,
      mainItem: "Aura Spatial Wireless Speaker",
    },
    {
      id: "NOVA-592019",
      date: "February 28, 2026",
      status: "Delivered",
      total: 165.0,
      itemCount: 1,
      mainItem: "Kuro Studio Ceramic Carafe",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-6">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground font-serif font-bold text-xl flex items-center justify-center border border-border">
            AV
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">{profileForm.name}</h1>
            <p className="text-xs text-muted-foreground">NOVA Circle Member • Joined 2024</p>
          </div>
        </div>

        <Link href="/shop" className="mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Main Tabbed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1 text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-3 font-semibold flex items-center space-x-3 transition-colors ${
              activeTab === "profile"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-3 font-semibold flex items-center space-x-3 transition-colors ${
              activeTab === "orders"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Order History ({mockOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full text-left px-4 py-3 font-semibold flex items-center space-x-3 transition-colors ${
              activeTab === "addresses"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab("preferences")}
            className={`w-full text-left px-4 py-3 font-semibold flex items-center space-x-3 transition-colors ${
              activeTab === "preferences"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Preferences</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 bg-card border border-border p-6 sm:p-8">
          {/* TAB 1: Profile */}
          {activeTab === "profile" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h2 className="font-serif text-2xl font-bold">Personal Information</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage your customer account details and authentication contact.
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <Input
                  label="Full Name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />

                <div className="pt-2">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Orders */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold">Order History</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Review status and receipt details for your previous purchases.
                </p>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-border p-5 space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-3 gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-sm text-foreground">{order.id}</span>
                        <span className="text-muted-foreground">• {order.date}</span>
                      </div>
                      <span className="inline-flex items-center text-gold-600 dark:text-gold-400 font-semibold uppercase tracking-wider text-[11px]">
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-serif font-bold text-sm">{order.mainItem}</p>
                        <p className="text-muted-foreground">{order.itemCount} Item(s)</p>
                      </div>
                      <span className="font-bold text-sm">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Addresses */}
          {activeTab === "addresses" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h2 className="font-serif text-2xl font-bold">Saved Delivery Addresses</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage primary address for white-glove courier shipping.
                </p>
              </div>

              <div className="border border-border p-5 space-y-2 text-xs relative">
                <span className="bg-gold-500/10 text-gold-600 dark:text-gold-400 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-gold-500/20">
                  Default Shipping Address
                </span>
                <p className="font-bold text-sm pt-1">Alexander Vance</p>
                <p className="text-muted-foreground">742 Evergreen Terrace, Suite 4B</p>
                <p className="text-muted-foreground">San Francisco, CA 94107, United States</p>
                <p className="text-muted-foreground">+1 (555) 234-5678</p>
              </div>
            </div>
          )}

          {/* TAB 4: Preferences */}
          {activeTab === "preferences" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h2 className="font-serif text-2xl font-bold">Notification & Language</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Configure communication frequency and curated journal notifications.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between border border-border p-4 cursor-pointer">
                  <span>Receive NOVA Editorial Journal & Early Collection Access</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-ring" />
                </label>
                <label className="flex items-center justify-between border border-border p-4 cursor-pointer">
                  <span>SMS Order Logistics & Freight Tracking Alerts</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-ring" />
                </label>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
