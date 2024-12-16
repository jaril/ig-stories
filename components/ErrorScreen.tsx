import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  error: Error;
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">An error has happened</h1>
      <p className="text-lg mb-8 text-gray-700">{error.message}</p>
      <Link href="/">
        <Button variant="outline" className="flex items-center space-x-2">
          <span>Back to Homepage</span>
        </Button>
      </Link>
    </div>
  );
}
