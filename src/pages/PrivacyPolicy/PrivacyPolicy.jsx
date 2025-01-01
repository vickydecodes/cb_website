import React from "react";
import "./PrivacyPolicy.css";
import { Helmet } from "react-helmet-async";

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>ConnectBeez | Privacy Policy</title>
      </Helmet>
      <div className="d-flex justify-content-center">
        <div className="full-page-container_privacy_policy">
          <div className="content_privacy_policy shadow-lg mb-3">
            <div className="row g-0 p-0" style={{ height: "100%" }}>
              <div className="headerForLogoAndGreet mb-3">
                <img
                  src="/img/logo with name.png"
                  className="headerLogo img-fluid"
                  alt=""
                />
                <div>
                  <h1>Privacy Policy</h1>
                </div>
              </div>
            </div>
            <div className="privacy-policy">
              <h1>Privacy Policy for ConnectBeez</h1>

              <h2>1. Introduction</h2>
              <p>
                Welcome to ConnectBeez, a platform designed for colleges to post
                and manage events. This Privacy Policy explains how ConnectBeez
                collects, uses, and protects your information when you access
                our website. By using the platform, you agree to the collection
                and use of information as described in this policy.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>a. Information You Provide:</h3>
              <ul>
                <li>
                  When you register an account or post events, we collect
                  personal and institutional details such as your name, email
                  address, college name, and event details.
                </li>
              </ul>
              <h3>b. Automatically Collected Information:</h3>
              <ul>
                <li>
                  We may collect non-personal data such as browser type, IP
                  address, pages visited, and usage patterns through cookies and
                  similar technologies.
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <ul>
                <li>Enable colleges to post and manage events.</li>
                <li>
                  Communicate updates, notifications, or support messages.
                </li>
                <li>
                  Improve the functionality and user experience of the platform.
                </li>
              </ul>

              <h2>4. Data Sharing</h2>
              <p>
                We do not sell, rent, or share your personal information with
                third parties, except as required by law or with your consent.
                Event details posted on the platform are publicly visible.
              </p>

              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to
                provide the platform’s services or as required by applicable
                law. You may request deletion of your data by contacting us.
              </p>

              <h2>6. Cookies</h2>
              <p>
                ConnectBeez uses cookies to enhance the user experience. You can
                manage cookie preferences through your browser settings.
                However, disabling cookies may affect your ability to use
                certain features.
              </p>

              <h2>7. Security</h2>
              <p>
                We employ reasonable security measures to protect your data from
                unauthorized access, loss, or misuse. However, no system is
                completely secure, and we cannot guarantee absolute data
                security.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                The platform is intended for use by colleges and their
                representatives. We do not knowingly collect personal
                information from individuals under the age of 16.
              </p>

              <h2>9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any
                significant changes will be communicated via the platform.
                Continued use of ConnectBeez constitutes acceptance of the
                updated policy.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
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
