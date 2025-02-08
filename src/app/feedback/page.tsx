'use client';

import { useState, useRef } from 'react';
import styles from '@/app/css-modules/forms.module.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import emailjs from '@emailjs/browser';

export default function Feedback() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    category: 'general',
    feedback: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_c0m0pkm',
          'template_0jd885o',
          form.current,
          'xeIQWZ_Z_RdIoX_1n'
        )
        .then(
          (result) => {
            console.log('Feedback sent successfully:', result.text);
            setFormData({
              name: '',
              email: '',
              rating: '5',
              category: 'general',
              feedback: ''
            });
            alert('Thank you for your feedback!');
          },
          (error) => {
            console.error('Failed to send feedback:', error.text);
            alert('Failed to send feedback. Please try again later.');
          }
        );
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1>Feedback</h1>
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
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                required
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="general">General</option>
                <option value="website">Website</option>
                <option value="games">Games</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="feedback">Feedback</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Submit Feedback</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
