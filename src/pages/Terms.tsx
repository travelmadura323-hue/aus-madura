import { Heading1Icon } from "lucide-react";

const Terms = () => {
  return (
    <>
      <section>
        <div className="pt-28">
          <div className="bg-primary py-20 text-center -mt-22">
            <div className="mx-auto max-w-3xl px-6">
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                Terms & Conditions
              </h1>

              <p className="mt-4 text-white/80 leading-relaxed italic">
                "Effective Date: 11th March 2026."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-8 text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Introduction
            </h2>
            <p>
              Welcome to maduraglobal.com (“Website”), owned and operated by
              Madura Travel Service Pvt Ltd.
              By accessing or using our Website and services, you agree to comply
              with and be legally bound by the terms and conditions set forth below.
              If you do not agree with these terms, please refrain from using our
              website or booking our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept these Terms of Use,
              along with our privacy policy, notices and disclaimers. Where you
              represent another person or entity, you warrant that you are authorized
              to accept these terms on their behalf.
            </p>
            <p className="mt-3">
              Madura Travel Service reserves the right to modify these terms at any time
              by posting updated terms on this website. Continued use of the website
              constitutes acceptance of the modified terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Booking & Payments
            </h2>
            <p>
              A non-refundable booking deposit is required at the time of booking.
              Full payment must be made as per the payment schedule communicated
              during booking. Failure to complete payment may result in cancellation
              of services without refund.
            </p>
            <p className="mt-3">
              Prices are subject to change due to currency fluctuations, supplier
              rate revisions, taxes, fuel surcharges, or government regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Cancellation & Refund Policy
            </h2>
            <p>
              Cancellation charges apply depending on the timing of cancellation
              and supplier policies. Refunds, if applicable, will be processed to
              the original mode of payment.
            </p>
            <p className="mt-3">
              Inactive accounts exceeding 120 days may be deactivated. Setup fees
              are non-refundable except in cases rejected during compliance or KYC validation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Chargebacks & Transaction Disputes
            </h2>
            <p>
              Transactions may be disputed within 120 days from the transaction date
              as per Card Network rules. In case of a chargeback, Madura Travel Service
              reserves the right to recover disputed amounts from the merchant or user.
            </p>
            <p className="mt-3">
              Refunds or reversals will be handled in accordance with applicable
              payment network regulations and documented evidence provided by the parties involved.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Travel Documents & Visa
            </h2>
            <p>
              Clients are solely responsible for valid passports, visas, travel insurance,
              and any required medical certifications. The Company is not liable for visa
              rejection, immigration refusal, or delays caused by government authorities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Liability Disclaimer
            </h2>
            <p>
              The Company acts as a facilitator between clients and third-party service
              providers such as airlines, hotels, transport operators, and tour operators.
              We are not responsible for acts, omissions, delays, injuries, losses, or
              damages caused by such independent providers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Insurance
            </h2>
            <p>
              Clients are required to obtain adequate travel and medical insurance
              coverage for the duration of their trip. The Company is not responsible
              for claims related to insurance coverage or denial.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">
              Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions are governed by the laws of India.
              Any disputes arising shall be subject to the exclusive jurisdiction
              of courts located in Chennai, Tamil Nadu.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Terms;