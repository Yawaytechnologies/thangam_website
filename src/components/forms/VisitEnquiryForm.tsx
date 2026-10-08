import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { enquirySchema, propertyInterestOptions, today, type EnquiryValues } from '../../lib/validation/enquiry';

export function EnquiryForm({ onSaved }: { onSaved: () => void }) {
  const [saveError, setSaveError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', phone: '', date: '', interest: 'Residential plots', consent: false },
  });
  const error = (field: keyof EnquiryValues) => errors[field] && <span id={`${field}-error`} role="alert" className="text-red-700 text-xs">{errors[field]?.message}</span>;
  const accessibility = (field: keyof EnquiryValues) => ({ 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `${field}-error` : undefined });
  return <form className="enquiry-form" noValidate onSubmit={handleSubmit(values => {
    setSaveError('');
    try {
      localStorage.setItem('thangam-visit-enquiry', JSON.stringify(values));
      onSaved();
    } catch {
      setSaveError('Your browser could not save the enquiry. Please enable local storage and try again.');
    }
  })}>
    <p>Prepare your details for a future conversation. This preview saves the enquiry locally; it does not send it.</p>
    <label>Your name<input {...register('name')} {...accessibility('name')} autoComplete="name" placeholder="Full name"/>{error('name')}</label>
    <label>Phone number<input {...register('phone')} {...accessibility('phone')} type="tel" autoComplete="tel" placeholder="Your contact number"/>{error('phone')}</label>
    <label>Preferred date<input {...register('date')} {...accessibility('date')} type="date" min={today()}/>{error('date')}</label>
    <label>What are you looking for?<select {...register('interest')} {...accessibility('interest')}>{propertyInterestOptions.map(option => <option key={option}>{option}</option>)}</select>{error('interest')}</label>
    <label className="consent"><input type="checkbox" {...register('consent')} {...accessibility('consent')}/> I agree to store these details in this browser.</label>{error('consent')}
    {saveError && <p role="alert">{saveError}</p>}
    <button className="button" type="submit" disabled={isSubmitting}>Save enquiry on this device <ArrowRight size={16}/></button>
  </form>;
}
