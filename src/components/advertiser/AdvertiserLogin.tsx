import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AdvertiserLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
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
      // TODO: Replace with your backend login endpoint
      const res = await fetch('http://localhost:8082/api/advertiser/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Login failed');
      // On success, go to advertiser dashboard
      navigate('/advertiser');
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-card max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">Advertiser Login</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 rounded border" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 rounded border" required />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      <div className="text-center mt-2">
        <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/advertiser/register')}>
          Register as an Advertiser
        </Button>
      </div>
    </form>
  );
}
