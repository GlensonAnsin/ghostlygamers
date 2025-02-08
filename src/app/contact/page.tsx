'use client';

import { useState, useRef } from 'react';
import styles from '@/app/css-modules/forms.module.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_c0m0pkm',
          'template_6rgajca',
          form.current,
          'xeIQWZ_Z_RdIoX_1n'
        )
        .then(
          (result) => {
            console.log('Email sent successfully:', result.text);
            setFormData({ name: '', email: '', message: '' });
            alert('Thank you for your message! We will get back to you soon.');
          },
          (error) => {
            console.error('Failed to send email:', error.text);
            alert('Failed to send message. Please try again later.');
          }
        );
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1>Contact Us</h1>
          <form ref={form} onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="user_email">Email</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
