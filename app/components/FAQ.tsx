"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What exactly does Tezzeract do?",
      answer:
        "We help businesses automate their workflows using AI — everything from automating emails, document handling, and repetitive tasks to creating AI-powered assistants and custom tools. Simply put, we save your team time so you can focus on growth.",
    },
    {
      question: " I'm not tech-savvy. Can I still use your services?",
      answer:
        "Absolutely. Our solutions are built to be simple, intuitive, and designed for non-technical teams like HR, operations, marketing, and finance. We guide you through every step. No jargon, no overwhelm.",
    },
    {
      question: "Do I need to already use AI tools or software?",
      answer:
        "Not at all. Whether you're just starting out or already using tools like ChatGPT, Zapier, or Notion, we'll meet you where you are and build a solution that works with what you already have.",
    },
    {
      question: "How long does it take to implement a solution?",
      answer:
        "It depends on the complexity. Some automations can go live in just a few days. Larger systems might take a few weeks. Either way, we move fast and keep you updated at every step.",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We're industry-agnostic. Our services work for retail, finance, healthcare, education, agencies, startups, and more. If you have repetitive tasks or inefficiencies, we can help.",
    },
    {
      question: "Is this secure? Will my data be safe?",
      answer:
        "Yes. Security and data privacy are top priorities. We follow best practices for encryption, access control, and only work with trusted, enterprise-grade AI tools.",
    },
    {
      question: "What's the pricing like?",
      answer:
        "We tailor our pricing based on your business size, needs, and complexity. Book a free strategy call and we'll give you a transparent quote with no hidden fees.",
    },
    {
      question: "Can you build something custom for my business?",
      answer:
        "Yes, that's one of our specialties. If you have a unique challenge or idea, we can build a fully custom AI solution or automation tailored specifically for you.",
    },
    {
      question: "What's the first step if I want to get started?",
      answer:
        "Easy, just book a free strategy call. We'll understand your needs, suggest the right approach, and show you how automation can fit into your workflow. No pressure, just value.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="">
      <div className="w-full max-w-5xl mx-auto px-6 z-10 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-8xl font-light text-transparent mb-4"
          style={{
            backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}>
            FAQ
          </h2>
          
          <div className="space-y-6 md:space-y-8 text-center">
            <p className="text-base md:text-3xl text-gray-600 leading-tighter">
              Everything you need to know about our remote teams, flexible pricing, and how to get started.
            </p>
          </div>
        </div>
<div className="h-[100vh]">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-6 px-4 flex justify-between items-center hover:bg-black-800/50 transition-colors duration-200 rounded-lg"
              >
                <span className="text-lg font-medium pr-4 text-[#0E1934]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-6 text-neutral-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>
      </div>
    </section>
  );
};
