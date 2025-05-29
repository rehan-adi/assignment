import { motion } from 'framer-motion';
import Input from '../components/Input';
import { getToken } from '../utils/token';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../queries/signup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';


const SignUp = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signup({
        variables: {
          email,
          password,
          username,
        },
      });

      navigate('/signin');
      console.log('Signup success:', response.data.signup.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
      console.error('Signup failed:', err);
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
            <h1 className="text-2xl font-bold text-gray-900">Join Our Platform</h1>
            <p className="text-gray-600 font-semibold mt-2">Start your journey with us today</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} >
            <Input
              label="Username"
              type="text"
              id="username"
              placeholder="John Doe"
              icon={<User size={18} />}
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-2">
              <Button type="submit" fullWidth rightIcon={<ArrowRight size={16} />}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Signing up
                  </div>
                ) : (
                  'Sign up'
                )}
              </Button>
            </div>

            {errorMsg && (
              <div className="text-sm w-full flex justify-center items-center text-red-500 font-medium -mt-2">
                {errorMsg}
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-primary-600 hover:text-primary-700">
                  Sign in
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

export default SignUp;
