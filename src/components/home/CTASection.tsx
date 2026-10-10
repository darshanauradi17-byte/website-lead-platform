
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gray-900 px-8 py-14 text-center text-white md:px-16">
        <h2 className="text-3xl font-bold md:text-5xl">
          Ready to take your business online?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-gray-300">
          Get a professional website for your shop, salon, bakery, or local
          business. Tell us what you need, and we will help you get started.
        </p>

        <Link
          href="/get-website"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
        >
          Get Your Website
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
