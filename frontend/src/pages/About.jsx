import { Heart, Target, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About GigGH
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting talented Ghanaian entertainers with people hosting celebrations
          </p>
        </div>

        {/* Mission */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-[#7C3AED] p-4 rounded-full">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            GigGH is dedicated to helping talented Ghanaian entertainers monetize their skills
            by connecting them with people hosting birthdays, weddings, anniversaries, and
            corporate events. We believe that every talented musician, dancer, and comedian
            deserves the opportunity to earn a living doing what they love.
          </p>
        </section>

        {/* Story */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-[#FF6B35] p-4 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          </div>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              GigGH was founded by a musician who saw church friends and fellow artists
              struggling to find opportunities to showcase their talent and earn income. Many
              talented performers in Ghana have incredible skills but lack the platform and
              connections to reach potential customers.
            </p>
            <p>
              At the same time, people hosting events often struggle to find reliable,
              talented entertainers. They don't know where to look, who to trust, or how to
              verify the quality of performers.
            </p>
            <p>
              GigGH bridges this gap. We provide a trusted platform where customers can easily
              discover, review, and book talented entertainers, while performers can showcase
              their skills, build their reputation, and grow their careers.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-[#7C3AED] p-4 rounded-full">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Trust</h3>
              <p className="text-gray-600">
                We build trust through transparency, verified reviews, and reliable service.
                Every booking is backed by our commitment to quality.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Quality</h3>
              <p className="text-gray-600">
                We curate talented performers and ensure high standards. Every performer on
                our platform is verified and reviewed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Fair Compensation</h3>
              <p className="text-gray-600">
                Performers receive 90% of booking fees. We believe in fair compensation for
                talent and supporting the entertainment industry in Ghana.
              </p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-gradient-to-r from-[#7C3AED] to-[#FF6B35] rounded-lg shadow-md p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">12+</div>
              <p className="text-purple-100">Talented Performers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-purple-100">Successful Events</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.7</div>
              <p className="text-purple-100">Average Rating</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

