import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function InfluencerSignup() {
  const [form, setForm] = useState({
    username: '',
    name: '',
    walletAddress: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:8082/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Signup failed');
      setSuccess('Signup successful! Please login.');
      setTimeout(() => navigate('/influencer/login'), 1500);
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-purple-900/40 dark:to-blue-900/40">
      <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/40 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/30 z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 shadow-xl mb-3 border-4 border-white dark:border-slate-900">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.663-5.33-4-8-4z" /></svg>
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1 tracking-tight drop-shadow">Join as an Influencer</h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mb-1">Grow your brand. Get rewarded for your influence.</p>
          <p className="text-xs text-purple-500 dark:text-purple-300 font-semibold">Sign up to access exclusive campaigns!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Username</label>
            <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 transition-all shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Name</label>
            <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 transition-all shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Wallet Address</label>
            <input name="walletAddress" type="text" placeholder="0x..." value={form.walletAddress} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 transition-all shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Email</label>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 transition-all shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Password</label>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-500 transition-all shadow-sm" required />
          </div>
          {error && <div className="text-red-500 text-sm text-center font-semibold animate-pulse">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center font-semibold animate-pulse">{success}</div>}
          <Button type="submit" className="w-full py-3 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl hover:from-pink-600 hover:to-purple-700 transition-all rounded-2xl tracking-wide text-white text-shadow-lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Signing up...</span>
            ) : 'Sign Up'}
          </Button>
        </form>
        <div className="text-center mt-6">
          <span className="text-sm text-slate-600 dark:text-slate-300">Already have an account?</span>
          <Button type="button" variant="outline" className="w-full mt-2 border-2 border-purple-400 hover:border-pink-400 transition-all" onClick={() => navigate('/influencer/login')}>
            Login as Influencer
          </Button>
        </div>
      </div>
    </div>
  );
}
