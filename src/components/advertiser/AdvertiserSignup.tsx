import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AdvertiserSignup() {
  const [form, setForm] = useState({ name: '', email: '', company: '', wallet: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8082/api/advertiser/regiseter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      // On success, go to staking page
      navigate('/advertiser/stake');
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-card max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">Advertiser Signup</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 rounded border" required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 rounded border" required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full p-2 rounded border" required />
      <input name="wallet" placeholder="Wallet Address" value={form.wallet} onChange={handleChange} className="w-full p-2 rounded border" required />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Submitting...' : 'Sign Up'}</Button>
    </form>
  );
}
