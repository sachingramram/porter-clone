import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 border-b border-gray-200">
        {/* Adjusted padding here from py-24 to py-12 to remove top space */}
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-in slide-in-from-bottom-4">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Book Trucks & Bikes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                in Minutes
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              On-demand logistics service for intra-city goods transport. Fast,
              reliable, and affordable solutions for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-vehicle"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg text-center"
              >
                Book a Vehicle
              </Link>

              <Link
                href="/login"
                className="px-8 py-4 border-2 border-gray-200 text-gray-800 rounded-xl font-bold hover:border-black hover:text-black transition text-center"
              >
                Track Booking
              </Link>
            </div>
          </div>

          {/* Right Illustration / Image */}
          <div className="relative h-80 md:h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <img
              src="https://www.shutterstock.com/image-photo/orange-cargo-volvo-truck-white-600nw-2531838041.jpg"
              alt="Logistics Truck"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
              <p className="text-white font-bold text-lg backdrop-blur-sm bg-white/20 px-4 py-2 rounded-lg border border-white/30">
                Premium Fleet 🚚
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose the right vehicle for your needs. We cover everything from
              documents to furniture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              emoji="🛵"
              title="Bike Delivery"
              desc="Instant delivery for small packages, documents, and food."
            />
            <ServiceCard
              emoji="🚛"
              title="Mini Truck"
              desc="Perfect for house shifting, appliances, and business goods."
            />
            <ServiceCard
              emoji="🚚"
              title="Heavy Truck"
              desc="Large loads, bulk transport, and industrial movement."
            />
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Clients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
            <div className="text-2xl font-bold text-gray-400">
              Nandana Palace
            </div>
            <div className="text-2xl font-bold text-gray-400">Fluenco</div>
            <div className="text-2xl font-bold text-gray-400">Cars24</div>
            <div className="text-2xl font-bold text-gray-400">New Me</div>
            <div className="text-2xl font-bold text-gray-400">Myntra</div>
            <div className="text-2xl font-bold text-gray-400">BigBasket</div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features We Offer
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Experience the best-in-class logistics features designed for your
              convenience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              emoji="📍"
              title="Real-time Tracking"
              desc="Track your goods in real-time with our advanced GPS technology."
            />
            <FeatureCard
              emoji="🛡️"
              title="Safe & Secure"
              desc="Verified driver partners and secure handling of your goods."
            />
            <FeatureCard
              emoji="💰"
              title="Affordable Pricing"
              desc="Transparent pricing with no hidden charges. Pay for what you use."
            />
          </div>
        </div>
      </section>

      {/* Our Growing Network Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Growing Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-extrabold mb-2">10M+</div>
              <div className="text-indigo-200">Successful Trips</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">500K+</div>
              <div className="text-indigo-200">Driver Partners</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">15+</div>
              <div className="text-indigo-200">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Transforming Cities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We are Transforming Cities
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Present in major cities across India, changing the way goods move.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <CityCard city="Delhi NCR" icon="🏛️" />
            <CityCard city="Mumbai" icon="🌉" />
            <CityCard city="Bangalore" icon="🌳" />
            <CityCard city="Hyderabad" icon="🕌" />
            <CityCard city="Chennai" icon="🏖️" />
            <CityCard city="Kolkata" icon="🏰" />
            <CityCard city="Pune" icon="⛰️" />
            <CityCard city="Ahmedabad" icon="🏙️" />
            <CityCard city="Jaipur" icon="🏯" />
            <CityCard city="Lucknow" icon="🕰️" />
          </div>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Some Words From Our Happy Customers
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Dheeraj Sharma"
              quote="Porter made my house shifting so easy. The driver was professional and the pricing was very reasonable."
            />
            <TestimonialCard
              name="Priya Patel"
              quote="I use Porter for my business deliveries. It's reliable, fast, and helps me save a lot of time."
            />
            <TestimonialCard
              name="Amit Verma"
              quote="Great service! The app is very user-friendly and the tracking feature is excellent."
            />
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Catering to the logistics needs of a wide range of industries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <IndustryCard title="E-commerce" icon="🛒" />
            <IndustryCard title="FMCG" icon="📦" />
            <IndustryCard title="Retail" icon="🛍️" />
            <IndustryCard title="Manufacturing" icon="🏭" />
            <IndustryCard title="Pharma" icon="💊" />
            <IndustryCard title="Textiles" icon="👚" />
            <IndustryCard title="Furniture" icon="🛋️" />
            <IndustryCard title="Electronics" icon="💻" />
          </div>
        </div>
      </section>

      {/* For Any More Query Section */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">For Any More Query</h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Have specific requirements or need a custom solution for your
            business? Get in touch with our experts.
          </p>
          <Link
            href="/book-vehicle"
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            <FAQItem
              question="How do I book a vehicle on Porter Clone?"
              answer="You can easily book a vehicle through our website or app by selecting the vehicle type, pickup, and drop locations."
            />
            <FAQItem
              question="What are the payment options available?"
              answer="We accept various payment methods including cash, credit/debit cards, net banking, and UPI."
            />
            <FAQItem
              question="Is there a cancellation fee?"
              answer="A cancellation fee may apply if you cancel the booking after a driver has been assigned. Please check our terms and conditions."
            />
            <FAQItem
              question="How can I track my booking?"
              answer="You can track your booking in real-time through the app or website using your booking ID."
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand & App */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="text-2xl font-bold text-white mb-6 block"
              >
                PORTER CLONE
              </Link>
              <div className="mb-8">
                <h3 className="text-sm font-bold mb-4">Follow us on</h3>
                <div className="flex gap-4">
                  {/* Social Media Icons Placeholder */}
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    FB
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    TW
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    IG
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    LI
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-2">
                  Download our app now!
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Scan the QR Code to download
                </p>
                {/* QR Code Placeholder */}
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center text-black">
                  QR Code
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/api-integrations" className="hover:text-white">
                    API Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/packers-movers" className="hover:text-white">
                    Packers & Movers
                  </Link>
                </li>
                <li>
                  <Link href="/two-wheelers" className="hover:text-white">
                    Two Wheelers
                  </Link>
                </li>
                <li>
                  <Link href="/trucks" className="hover:text-white">
                    Trucks
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className="hover:text-white">
                    Porter Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6">Support</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/terms-ssi" className="hover:text-white">
                    Terms of Service - SSI
                  </Link>
                </li>
                <li>
                  <Link href="/insurance-faqs" className="hover:text-white">
                    Insurance FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/driver-terms" className="hover:text-white">
                    Driver Partner Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/zero-tolerance" className="hover:text-white">
                    Zero Tolerance Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Countries */}
            <div>
              <h3 className="text-lg font-bold mb-6">Countries</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/uae" className="hover:text-white">
                    United Arab Emirates
                  </Link>
                </li>
                <li>
                  <Link href="/turkey" className="hover:text-white">
                    Turkey
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Domestic Cities */}
          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-bold mb-6">Domestic Cities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm text-gray-400">
              <div>Delhi NCR</div>
              <div>Hyderabad</div>
              <div>Bangalore</div>
              <div>Mumbai</div>
              <div>Vadodara</div>
              <div>Chandigarh</div>
              <div>Jaipur</div>
              <div>Chennai</div>
              <div>Kolkata</div>
              <div>Indore</div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-12">
            © {new Date().getFullYear()} Porter Clone. All rights reserved.
            Based on the footer design from Porter.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- Helper Components ---------------- */

function ServiceCard({
  title,
  desc,
  emoji,
}: {
  title: string;
  desc: string;
  emoji: string;
}) {
  return (
    <div className="group border border-gray-100 rounded-2xl p-8 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-50 group-hover:scale-110 transition-colors">
        {emoji}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  emoji,
}: {
  title: string;
  desc: string;
  emoji: string;
}) {
  return (
    <div className="text-center p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-all">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function CityCard({ city, icon }: { city: string; icon: string }) {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-all cursor-pointer">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold text-gray-900">{city}</div>
    </div>
  );
}

function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
      <p className="text-gray-600 italic mb-4">&quot;{quote}&quot;</p>
      <div className="font-bold text-gray-900">{name}</div>
      <div className="text-sm text-gray-500">Customer</div>
    </div>
  );
}

function IndustryCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-all">
      <div className="text-2xl">{icon}</div>
      <div className="font-bold text-gray-900">{title}</div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-gray-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between cursor-pointer">
        <h3 className="font-bold text-gray-900">{question}</h3>
        <span className="ml-4 flex-shrink-0 text-gray-500 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>
      <p className="mt-4 text-gray-600">{answer}</p>
    </details>
  );
}