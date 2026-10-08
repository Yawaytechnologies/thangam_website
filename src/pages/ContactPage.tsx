import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Clock3, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { SiteHeader } from '../components/layout/SiteHeader';
import { companyPhotos } from '../assets/company-photos';
import { contactSchema, today, type ContactValues } from '../lib/validation/enquiry';
import '../styles/contact.css';

const phoneNumbers = [
  { label: '+91 98400 49470', href: 'tel:+919840049470' },
  { label: '+91 93421 04773', href: 'tel:+919342104773' },
];

const officeAddress = '43, Unique Paradise Complex, near MEPZ, 11, Thomas St, Tiru Vi Ka Nagar, Tambaram, Chennai, Tamil Nadu 600045';
const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5563450710465!2d80.12118521070852!3d12.936211515600318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f5c7139640d%3A0x70039ca20b2e9aa9!2sSRI%20THANGAM%20HOUSING!5e0!3m2!1sen!2sin!4v1713961832119!5m2!1sen!2sin';
const mapLink = 'https://www.google.com/maps/search/?api=1&query=SRI+THANGAM+HOUSING+Tambaram+Chennai';
const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61558584381474', icon: Facebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sri-thangam-80a71a273', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/srithangamhousing_sth', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@SriThangamHousing', icon: Youtube },
];
const contactHighlights = [
  { label: 'Site visits', value: 'Planned with care' },
  { label: 'Response', value: 'Same business day' },
  { label: 'Office', value: 'Tambaram, Chennai' },
];

export function ContactPage() {
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const contactPhoto = companyPhotos.find((photo) => photo.id === 'brochure-presentation');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', name: '', message: '', phone: '', preferredDate: '' },
  });

  const fieldError = (field: keyof ContactValues) => errors[field] && <span className="contact-field-error" role="alert">{errors[field]?.message}</span>;
  const submitContact = handleSubmit((values) => {
    setSaveError('');
    try {
      const existing = JSON.parse(localStorage.getItem('thangam-contact-enquiries') || '[]') as ContactValues[];
      localStorage.setItem('thangam-contact-enquiries', JSON.stringify([...existing, { ...values, submittedAt: new Date().toISOString() }]));
      setSaved(true);
      reset();
    } catch {
      setSaveError('This browser could not save the request. Please call either number listed here.');
    }
  });

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return <>
    <SiteHeader onPlanVisit={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}/>
    <main id="main" className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        {contactPhoto && <img src={contactPhoto.src} alt={contactPhoto.alt} className="contact-hero-image"/>}
        <div className="contact-hero-overlay"/>
        <div className="contact-hero-content">
          <span>WE'RE HERE TO HELP</span>
          <h1 id="contact-title">Contact us</h1>
          <p>Tell us what you're looking for. Our team will help you take the next step with clarity and care.</p>
          <div className="contact-hero-actions">
            <a href={phoneNumbers[0].href}><Phone size={17}/> Call now</a>
            <button type="button" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}><MessageCircle size={17}/> Leave a message</button>
          </div>
        </div>
      </section>

      <section className="contact-highlight-strip" aria-label="Contact highlights">
        {contactHighlights.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
      </section>

      <section className="contact-main" aria-label="Contact Sri Thangam Housing">
        <div className="contact-info-column">
          <p className="contact-eyebrow">GET IN TOUCH</p>
          <h2>Let's start a<br/>conversation.</h2>
          <p className="contact-intro-copy">Reach our team by phone or visit the Tambaram office. You can also leave your details and preferred callback date.</p>
          <div className="contact-detail-list">
            <div className="contact-detail"><span className="contact-detail-icon"><Phone size={19}/></span><div><h3>Call us</h3>{phoneNumbers.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}</div></div>
            <div className="contact-detail"><span className="contact-detail-icon"><Clock3 size={19}/></span><div><h3>Office hours</h3><p>Monday to Saturday<br/>10:00 AM - 6:30 PM</p></div></div>
            <div className="contact-detail"><span className="contact-detail-icon"><MapPin size={19}/></span><div><h3>Visit our office</h3><a href={mapLink} target="_blank" rel="noreferrer">{officeAddress}</a></div></div>
          </div>
          <div className="contact-socials" aria-label="Social media links">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon size={17}/></a>)}</div>
        </div>

        <section id="contact-form" className="contact-form-panel" aria-labelledby="contact-form-title">
          <div className="contact-form-heading"><p className="contact-eyebrow">CONTACT US</p><h2 id="contact-form-title">How can we help?</h2><p>Share a few details and choose a good time for us to call.</p></div>
          {saved && <div className="contact-success" role="status"><strong>Your request is saved on this device.</strong><span>This preview does not send messages to the team. For a direct response, call either number on this page.</span><button type="button" onClick={() => setSaved(false)}>Send another request</button></div>}
          {!saved && <form className="contact-form" noValidate onSubmit={submitContact}>
            <label>Email address<input {...register('email')} type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)}/>{fieldError('email')}</label>
            <label>Your name<input {...register('name')} autoComplete="name" placeholder="Full name" aria-invalid={Boolean(errors.name)}/>{fieldError('name')}</label>
            <label>Phone number<input {...register('phone')} type="tel" autoComplete="tel" placeholder="+91" aria-invalid={Boolean(errors.phone)}/>{fieldError('phone')}</label>
            <label>Preferred date to call<input {...register('preferredDate')} type="date" min={today()} aria-invalid={Boolean(errors.preferredDate)}/>{fieldError('preferredDate')}</label>
            <label className="contact-message-field">Your message <span>(optional)</span><textarea {...register('message')} rows={4} placeholder="Tell us what you'd like to know" aria-invalid={Boolean(errors.message)}/>{fieldError('message')}</label>
            {saveError && <p className="contact-save-error" role="alert">{saveError}</p>}
            <button className="contact-submit" type="submit" disabled={isSubmitting}>Submit <ArrowRight size={17}/></button>
            <p className="contact-form-note"><Mail size={14}/> Demo form: details are stored in this browser only and are not sent.</p>
          </form>}
        </section>
      </section>

      <section className="contact-map-section" aria-labelledby="contact-map-title">
        <div className="contact-map-heading"><div><p className="contact-eyebrow">FIND US</p><h2 id="contact-map-title">Our Tambaram office</h2></div><a href={mapLink} target="_blank" rel="noreferrer">Open directions <ArrowRight size={15}/></a></div>
        <iframe title="Map showing Sri Thangam Housing in Tambaram, Chennai" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
      </section>
    </main>
  </>;
}
