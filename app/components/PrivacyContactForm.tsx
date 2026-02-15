"use client";

import React, { useState } from 'react';
import { TezzeractButton } from "./ui/TezzeractButton";

export default function PrivacyContactForm() {
    const [subject, setSubject] = useState('Privacy Inquiry');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:shanilka@tezzeract.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    };

    return (
        <section className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Privacy Inquiries</h2>
            <p className="text-gray-600 mb-6">
                If you have any questions or concerns about our privacy policy, please contact us using the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A9EE] focus:border-transparent outline-none transition-all text-gray-800"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A9EE] focus:border-transparent outline-none transition-all text-gray-800 resize-none"
                        placeholder="Please describe your privacy inquiry..."
                        required
                    />
                </div>

                <div className="pt-2">
                    <TezzeractButton type="submit" className="w-full sm:w-auto min-w-[150px]">
                        Send Message
                    </TezzeractButton>
                </div>
            </form>
        </section>
    );
}
