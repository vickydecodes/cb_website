import React from "react";
import "./TermsAndConditions.css";
import { Helmet } from "react-helmet-async";

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>ConnectBeez | Terms and Conditions</title>
      </Helmet>
      <div className="d-flex justify-content-center">
        <div className="full-page-container_terms_conditions">
          <div className="content_terms_conditions shadow-lg mb-3">
            <div className="row g-0 p-0" style={{ height: "100%" }}>
              <div className="headerForLogoAndGreet mb-3">
                <img
                  src="/img/logo with name.png"
                  className="headerLogo img-fluid"
                  alt="ConnectBeez Logo"
                />
                <div>
                  <h1>Terms and Conditions</h1>
                </div>
              </div>
            </div>
            <div className="terms-conditions">
              <h1>Terms and Conditions for ConnectBeez</h1>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using ConnectBeez, you agree to comply with and be
                bound by these Terms and Conditions. If you disagree with any
                part, you may not use the platform.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                ConnectBeez is intended for use by colleges and authorized
                representatives to post and manage events. Users must be 18 years
                or older.
              </p>

              <h2>3. User Responsibilities</h2>
              <p>
                Users are responsible for the accuracy and legality of the
                information they post. Inappropriate, false, or unlawful content
                is strictly prohibited.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                The platform and its content, including logos, designs, and
                features, are the intellectual property of ConnectBeez and cannot
                be used without prior consent.
              </p>

              <h2>5. Prohibited Activities</h2>
              <ul>
                <li>Posting false or misleading event information.</li>
                <li>Engaging in unauthorized access or data scraping.</li>
                <li>Uploading malicious software or viruses.</li>
              </ul>

              <h2>6. Limitation of Liability</h2>
              <p>
                ConnectBeez is not responsible for the accuracy or validity of
                events posted by users. The platform is provided "as is" without
                warranties.
              </p>

              <h2>7. Termination</h2>
              <p>
                ConnectBeez reserves the right to suspend or terminate user
                accounts that violate these terms.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of India. Any
                disputes will be resolved in the appropriate courts of Tamil Nadu,
                India.
              </p>

              <h2>9. Changes to Terms</h2>
              <p>
                ConnectBeez may update these Terms and Conditions from time to
                time. Continued use of the platform signifies acceptance of the
                updated terms.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                For questions or concerns about these Terms and Conditions,
                please contact us at{" "}
                <a href="mailto:connectbeezofficial@gmail.com">
                  connectbeezofficial@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
