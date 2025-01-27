import { IoIosContact } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

const ContactForm = () => {
    return (
        <section className="bg-gray-50 pt-24 pb-10">
      <div className="max-w-4xl bg-white border rounded-lg shadow-md mx-auto text-center pb-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Get in touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Address */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
              <IoLocationOutline className="text-3xl text-blue-700 font-semibold" />
              </div>
            </div>
            <h3 className="font-semibold text-lg">Our Address</h3>
            <p className="text-gray-600">
            No. 07-09, Kenwingston Business Centre Kenwingston Square Garden, Persiaran Bestari <br /> 
            Cyber 11, 63000 Cyberjaya, Selangor, Malaysia
            </p>
          </div>
          {/* Contact Info */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
              <IoIosContact className="text-4xl text-blue-700 font-semibold"/>
              </div>
            </div>
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <p className="text-blue-600">
              Give us a call at <br />
              <a href="tel:3108415500" className="text-blue-600 font-bold">
              03-8320 5403
              </a>
            </p>
          </div>
          {/* Live Support */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
              <MdOutlineMailOutline className="text-3xl text-blue-700 font-semibold" />
              </div>
            </div>
            <h3 className="font-semibold text-lg">Live Support</h3>
            <p className="text-blue-600">
              Email us at <br />
              <a
                href="https://www.jobilivechat.com"
                className="text-blue-600 font-bold"
              >
                hr@gates.edu.my
              </a>
            </p>
          </div>
        </div>
        {/* Form Section */}
        <form className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name*"
              className="border rounded-lg p-3 w-full"
              required
            />
            <input
              type="email"
              placeholder="Email Address*"
              className="border rounded-lg p-3 w-full"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject (optional)"
            className="border rounded-lg p-3 w-full"
          />
          <textarea
            rows="4"
            placeholder="Your message*"
            className="border rounded-lg p-3 w-full"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
    );
};

export default ContactForm;