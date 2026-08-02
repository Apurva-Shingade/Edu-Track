import React from 'react';

export default function ContactPage() {
  return (
    <div className="contact-page-container">
      
      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="contact-hero-text">
          <div className="badge-light">
            <span>✨</span> We're Here to Help
          </div>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have questions, need support, or want to learn more about Gemma LMS? 
            We'd love to hear from you.
          </p>
          
          <div className="trust-badges-row">
            <div className="trust-badge-item">
              <span>🎧</span> Fast Response
            </div>
            <div className="trust-badge-item">
              <span>🛡️</span> Secure & Private
            </div>
            <div className="trust-badge-item">
              <span>👥</span> Trusted by Educators
            </div>
          </div>
        </div>

        <div className="contact-hero-image">
          {/* <img src="/contact-mascot.png" alt="Gemma Support Mascot" style={{ maxWidth: '400px' }} /> */}
          <div style={{ fontSize: '150px', textAlign: 'center', position: 'relative' }}>
            🤖
            {/* Decorative Floating Elements Placeholders */}
            <div style={{ position: 'absolute', top: '0', left: '-50px', fontSize: '20px', backgroundColor: '#FFF', padding: '10px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              How can<br/>we help you?
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '-20px', fontSize: '24px', backgroundColor: '#FFF', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>✉️</div>
            <div style={{ position: 'absolute', bottom: '40px', right: '-40px', fontSize: '24px', backgroundColor: '#FFF', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>📞</div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="contact-main-grid">
        
        {/* Left Column: Form */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box-light" style={{ borderRadius: '50%' }}>🎧</div>
            <div>
              <h2 className="contact-section-title" style={{ margin: 0 }}>Send Us a Message</h2>
              <p className="contact-section-sub" style={{ margin: '4px 0 0 0' }}>Fill out the form and our team will get back to you as soon as possible.</p>
            </div>
          </div>

          <form>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="Enter your email address" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-select">
                <option>Select a subject</option>
                <option>Technical Support</option>
                <option>Billing & Pricing</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows="4" placeholder="Type your message here..."></textarea>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
              <button type="button" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Send Message <span>→</span>
              </button>
              <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🔒</span> Your information is secure and will never be shared.
              </span>
            </div>
          </form>
        </div>

        {/* Middle Column: Other Ways */}
        <div style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '0 30px' }}>
          <h2 className="contact-section-title">Other Ways to Reach Us</h2>
          <p className="contact-section-sub">Choose the way that works best for you.</p>
          
          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="icon-box-light">✉️</div>
              <div>
                <h4 className="info-title">Email Support</h4>
                <p className="info-desc">support@gemma-lms.com<br/>We reply within 24 hours</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="icon-box-light">💬</div>
              <div>
                <h4 className="info-title">Live Chat</h4>
                <p className="info-desc">Available in the app<br/>Mon - Fri, 9 AM - 6 PM (IST)</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="icon-box-light">📞</div>
              <div>
                <h4 className="info-title">Phone Support</h4>
                <p className="info-desc">+91 98765 43210<br/>Mon - Fri, 9 AM - 6 PM (IST)</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="icon-box-light">📍</div>
              <div>
                <h4 className="info-title">Address</h4>
                <p className="info-desc">Gemma LMS, EduTech Solutions Pvt. Ltd.<br/>2nd Floor, Knowledge Park,<br/>Bengaluru, Karnataka - 560045</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ */}
        <div style={{ paddingLeft: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="icon-box-light" style={{ borderRadius: '50%' }}>❓</div>
            <div>
              <h2 className="contact-section-title" style={{ margin: 0 }}>Common Questions</h2>
              <p className="contact-section-sub" style={{ margin: '4px 0 0 0' }}>Find quick answers to the most common inquiries.</p>
            </div>
          </div>

          <div>
            <div className="faq-item">What is Gemma LMS? <span>⌄</span></div>
            <div className="faq-item">How does AI quiz generation work? <span>⌄</span></div>
            <div className="faq-item">Can I import my syllabus or PDF? <span>⌄</span></div>
            <div className="faq-item">Is my data secure? <span>⌄</span></div>
            <div className="faq-item" style={{ borderBottom: 'none' }}>Can I try Gemma LMS for free? <span>⌄</span></div>
          </div>

          <div className="support-callout">
            <div className="icon-box-light" style={{ backgroundColor: '#FFF' }}>💬</div>
            <div>
              <h4 className="info-title">Still have questions?</h4>
              <p className="info-desc" style={{ marginBottom: '8px' }}>Our support team is ready to help you.</p>
              <a href="#chat" style={{ fontSize: '13px', color: 'var(--bottle-green)', fontWeight: 'bold', textDecoration: 'none' }}>Start a conversation →</a>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM FEATURES ROW */}
      <div className="features-bottom-row">
        <div className="feature-item">
          <div className="icon-box-light" style={{ backgroundColor: '#FFF', borderRadius: '50%' }}>👥</div>
          <div>
            <h4 className="feature-item-title">Loved by Educators</h4>
            <p className="feature-item-desc">Join 1,000+ teachers<br/>who trust Gemma LMS.</p>
          </div>
        </div>
        
        <div className="feature-item">
          <div className="icon-box-light" style={{ backgroundColor: '#FFF', borderRadius: '50%' }}>🛡️</div>
          <div>
            <h4 className="feature-item-title">Secure & Reliable</h4>
            <p className="feature-item-desc">Enterprise-grade security<br/>for your peace of mind.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-box-light" style={{ backgroundColor: '#FFF', borderRadius: '50%' }}>⭐</div>
          <div>
            <h4 className="feature-item-title">Built for Education</h4>
            <p className="feature-item-desc">Designed to simplify teaching<br/>and inspire learning.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-box-light" style={{ backgroundColor: '#FFF', borderRadius: '50%' }}>⚡</div>
          <div>
            <h4 className="feature-item-title">Always Improving</h4>
            <p className="feature-item-desc">We're constantly adding new<br/>features based on your feedback.</p>
          </div>
        </div>
      </div>

    </div>
  );
}