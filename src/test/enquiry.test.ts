import { describe, expect, it } from 'vitest';
import { contactSchema, enquirySchema, today } from '../lib/validation/enquiry';

const validEnquiry = () => ({
  name: '  Test Buyer  ', phone: '+91 9876543210', date: today(),
  interest: 'Residential plots', consent: true,
});

describe('visit enquiry validation', () => {
  it('accepts a valid enquiry and trims the buyer name', () => {
    expect(enquirySchema.parse(validEnquiry()).name).toBe('Test Buyer');
  });
  it.each([
    { name: ' ' }, { phone: '-------' }, { date: '2020-01-01' },
    { date: '2099-02-30' }, { consent: false }, { interest: 'Unknown' },
  ])('rejects invalid details: %j', invalid => {
    expect(enquirySchema.safeParse({ ...validEnquiry(), ...invalid }).success).toBe(false);
  });
});

describe('contact form validation', () => {
  const validContact = () => ({
    email: 'hello@example.com', name: 'A Buyer', message: '', phone: '+91 9840049470', preferredDate: '',
  });

  it('accepts a valid contact request and an optional callback date', () => {
    expect(contactSchema.parse(validContact()).email).toBe('hello@example.com');
    expect(contactSchema.parse({ ...validContact(), preferredDate: today() }).preferredDate).toBe(today());
  });

  it.each([
    { email: 'not-an-email' }, { name: ' ' }, { phone: '---' },
    { preferredDate: '2020-01-01' }, { preferredDate: '2099-02-30' },
  ])('rejects invalid contact details: %j', invalid => {
    expect(contactSchema.safeParse({ ...validContact(), ...invalid }).success).toBe(false);
  });
});
