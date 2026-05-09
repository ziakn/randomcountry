"use client";

import { useState } from "react";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! (This is a demo)");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="Doe"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
          placeholder="Tell us what's on your mind..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-[1.01]"
      >
        Send Message
      </button>
    </form>
  );
}
