import { useEffect, useState, type FormEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { KeyRound, LoaderCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const { t } = useTranslation();
  const { loginWithGoogle, loginWithPassword } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const getErrorMessage = (loginError: unknown) => {
    if (loginError instanceof FirebaseError) {
      if (loginError.code === 'auth/popup-closed-by-user') return '';
      if (loginError.code === 'auth/operation-not-allowed') {
        return t('auth.provider_disabled');
      }
    }
    return t('auth.invalid_credentials');
  };

  const handlePasswordLogin = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await loginWithPassword(username, password);
      onClose();
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    setError('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-dialog-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label={t('auth.close')}
        >
          <X size={20} />
        </button>

        <div className="mb-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound size={24} />
          </div>
          <h2 id="login-dialog-title" className="text-2xl font-bold text-brand-dark">
            {t('auth.admin_login')}
          </h2>
          <p className="mt-2 text-sm text-gray-500">{t('auth.admin_login_description')}</p>
        </div>

        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            {t('auth.username')}
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              autoFocus
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <label className="block text-sm font-semibold text-gray-700">
            {t('auth.password')}
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <LoaderCircle size={18} className="animate-spin" />}
            {t('auth.login')}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          {t('auth.or')}
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg font-bold text-blue-600">G</span>
          {t('auth.continue_google')}
        </button>
      </div>
    </div>
  );
};
