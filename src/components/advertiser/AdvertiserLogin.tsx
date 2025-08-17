import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

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
      const params = new URLSearchParams();
      params.append('email', form.email);
      params.append('password', form.password);
      const res = await fetch('http://localhost:8082/api/advertiser/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (!res.ok) throw new Error( 'Login failed');
      // On success, go to advertiser dashboard
      navigate('/advertiser');
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-purple-900/40 dark:to-blue-900/40">
      <div className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/30 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 shadow-lg mb-2">
            <ShieldCheck className="h-8 w-8 text-white" />
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-1 tracking-tight">Advertiser Login</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Access your advertiser dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Email</label>
            <input name="email" type="text" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Password</label>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <Button type="submit" className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:from-pink-600 hover:to-purple-600 transition-colors" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="text-center mt-6">
          <span className="text-sm text-slate-600 dark:text-slate-300">Don't have an account?</span>
          <Button type="button" variant="outline" className="w-full mt-2" onClick={() => navigate('/advertiser/signup')}>
            Register as an Advertiser
          </Button>
        </div>
      </div>
    </div>
  );
}
