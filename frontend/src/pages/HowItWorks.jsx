import { CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          How It Works
        </h1>

        {/* For Customers */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">For Customers</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#7C3AED] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Browse Talented Entertainers
                </h3>
                <p className="text-gray-600">
                  Explore our directory of musicians, dancers, and comedians. Filter by category,
                  location, price, and ratings to find the perfect match for your event.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Check Videos, Reviews, and Prices
                </h3>
                <p className="text-gray-600">
                  Watch performance videos, read customer reviews, and compare prices. Make an
                  informed decision based on real experiences.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#7C3AED] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Book and Pay Securely Through GigGH
                </h3>
                <p className="text-gray-600">
                  Submit a booking request with your event details. Our team will confirm within
                  24 hours and process secure payment through our platform.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Enjoy Your Event</h3>
                <p className="text-gray-600">
                  Sit back and enjoy your celebration! Your entertainer will arrive on time and
                  deliver an amazing performance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#7C3AED] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Rate Your Experience</h3>
                <p className="text-gray-600">
                  After your event, share your experience by leaving a review. Help others make
                  informed decisions and support talented performers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Entertainers */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">For Entertainers</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#7C3AED] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Create Profile with Videos
                </h3>
                <p className="text-gray-600">
                  Sign up and create your performer profile. Upload performance videos, add your
                  bio, set your pricing, and showcase your talent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Booking Requests</h3>
                <p className="text-gray-600">
                  Customers will discover your profile and submit booking requests. Review requests
                  and accept the ones that fit your schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#7C3AED] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Perform at Events</h3>
                <p className="text-gray-600">
                  Show up on time and deliver an amazing performance. Make every event memorable
                  and build your reputation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Get Paid (90% of Booking Fee)
                </h3>
                <p className="text-gray-600">
                  Receive 90% of the booking fee. Payment is released 24 hours after the event
                  completion. GigGH takes only 10% as platform fee.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#7C3AED] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Build Your Reputation</h3>
                <p className="text-gray-600">
                  Collect positive reviews and ratings. The better your reputation, the more
                  bookings you'll receive. Grow your entertainment career with GigGH.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment & Refund Policy */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Payment & Refund Policy
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center space-x-2">
                <XCircle className="w-6 h-6 text-red-500" />
                <span>Performer No-Show</span>
              </h3>
              <p className="text-gray-600">
                If a performer fails to show up for the event, customers receive a{' '}
                <strong>98% refund</strong>. We take this seriously and will investigate the
                situation.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-yellow-500" />
                <span>Poor Performance</span>
              </h3>
              <p className="text-gray-600">
                If there are complaints about performance quality, we investigate the situation.
                Depending on the circumstances, we may offer a{' '}
                <strong>50/50 split</strong> or full refund.
              </p>
            </div>

            <div className="border-l-4 border-[#7C3AED] pl-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-[#7C3AED]" />
                <span>Customer Cancellation</span>
              </h3>
              <p className="text-gray-600 mb-4">
                Refund policy based on cancellation timing:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>
                    <strong>7+ days before event:</strong> 95% refund to customer
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>
                    <strong>3-7 days before event:</strong> 80% refund to customer
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <span>
                    <strong>Less than 3 days:</strong> 50% refund to customer
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>
                    <strong>Day of event:</strong> No refund
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Payment Release</span>
              </h3>
              <p className="text-gray-600">
                Payment is released to performers <strong>24 hours after event completion</strong>.
                This allows time for any issues to be reported and resolved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;

