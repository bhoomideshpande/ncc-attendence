import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { FlagHeader } from "@/components/FlagHeader";

export default function InstituteDashboard() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <FlagHeader />

      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">
          Dashboard – {slug?.replace("_", " ").toUpperCase()}
        </h1>

        <p className="text-muted-foreground mb-6">
          Welcome to NCC Attendance Portal
        </p>

        {/* JUST A PLACEHOLDER – dashboard UI goes here */}
        <div className="p-10 border rounded-xl bg-white shadow">
          Institute-specific dashboard coming here…
        </div>
      </main>
    </div>
  );
}
