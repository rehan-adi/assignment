import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { addToken, getToken } from '../utils/token';
import { SIGNIN_MUTATION } from '../queries/signin';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';


const SignIn = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [signin, { loading }] = useMutation(SIGNIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signin({
        variables: {
          email,
          password,
        },
      });

      addToken(response.data.signin.token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signin failed:', err);
      setErrorMsg(err.message || 'Something went wrong');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="card p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 font-semibold mt-2">Sign in to your account to continue</p>
          </div>

          {/* Static error placeholder */}
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm hidden">
            Invalid credentials
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth rightIcon={<ArrowRight size={16} />}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Signing in
                </div>
              ) : (
                'Sign in'
              )}
            </Button>


            {errorMsg && (
              <div className="text-sm w-full flex justify-center items-center text-red-500 font-medium -mt-2">
                {errorMsg}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
                  Create one now
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              By submitting this form, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignIn;
