"use client";

import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasSeen = localStorage.getItem("newsletter_seen");
    if (!hasSeen) {
      const timer = setTimeout(() => setShow(true), 10000); // Show after 10 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    localStorage.setItem("newsletter_seen", "true");
    setTimeout(() => setShow(false), 3000);
  };

  const handleClose = () => {
    setShow(false);
    // Don't show again for 24 hours
    localStorage.setItem("newsletter_seen", Date.now().toString());
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">🌍 Get Daily Country Facts!</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Receive a fascinating country fact in your inbox every day. Join thousands of geography enthusiasts!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Subscribe Now
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">You're Subscribed!</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Welcome to our community of geography enthusiasts!</p>
          </div>
        )}
      </div>
    </div>
  );
}