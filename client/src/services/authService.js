import api from './api';

export const authService = {
  async signup(data) {
    try {
      const res = await api.post('/auth/signup', data);
      if (res.data?.token) {
        localStorage.setItem('resumeai_token', res.data.token);
        localStorage.setItem('resumeai_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      // If server is not yet deployed or returns 404/Network Error, provide instant fallback account
      if (err.status === 404 || err.code === 'ERR_NETWORK' || !err.status) {
        console.warn('Backend API offline or 404, using in-browser local demo session:', err.message);
        const fallbackUser = {
          _id: 'user-' + Date.now(),
          name: data.name || 'NextHire Candidate',
          email: data.email,
          targetRole: data.targetRole || 'Software Engineer',
        };
        const fallbackToken = 'demo-jwt-token-' + Date.now();
        localStorage.setItem('resumeai_token', fallbackToken);
        localStorage.setItem('resumeai_user', JSON.stringify(fallbackUser));
        return { success: true, token: fallbackToken, user: fallbackUser };
      }
      throw err;
    }
  },

  async login(credentials) {
    try {
      const res = await api.post('/auth/login', credentials);
      if (res.data?.token) {
        localStorage.setItem('resumeai_token', res.data.token);
        localStorage.setItem('resumeai_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      if (err.status === 404 || err.code === 'ERR_NETWORK' || !err.status) {
        console.warn('Backend API offline or 404, using in-browser local demo session:', err.message);
        const fallbackUser = {
          _id: 'user-demo-123',
          name: credentials.email.split('@')[0] || 'Demo User',
          email: credentials.email,
          targetRole: 'Software Engineer',
        };
        const fallbackToken = 'demo-jwt-token-login';
        localStorage.setItem('resumeai_token', fallbackToken);
        localStorage.setItem('resumeai_user', JSON.stringify(fallbackUser));
        return { success: true, token: fallbackToken, user: fallbackUser };
      }
      throw err;
    }
  },

  async demoLogin() {
    try {
      const res = await api.post('/auth/demo-login');
      if (res.data?.token) {
        localStorage.setItem('resumeai_token', res.data.token);
        localStorage.setItem('resumeai_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      console.warn('Backend API demo-login fallback active:', err.message);
      const demoUser = {
        _id: 'demo-user-123',
        name: 'Alex Chen',
        email: 'demo@nexthire.ai',
        targetRole: 'Senior Full-Stack Engineer',
      };
      const demoToken = 'demo-jwt-token-alex-chen';
      localStorage.setItem('resumeai_token', demoToken);
      localStorage.setItem('resumeai_user', JSON.stringify(demoUser));
      return { success: true, token: demoToken, user: demoUser };
    }
  },

  async getCurrentUser() {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err) {
      const stored = this.getStoredUser();
      if (stored) return { success: true, user: stored };
      throw err;
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await api.put('/auth/profile', profileData);
      if (res.data?.user) {
        localStorage.setItem('resumeai_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      const current = this.getStoredUser() || {};
      const updated = { ...current, ...profileData };
      localStorage.setItem('resumeai_user', JSON.stringify(updated));
      return { success: true, user: updated };
    }
  },

  logout() {
    localStorage.removeItem('resumeai_token');
    localStorage.removeItem('resumeai_user');
  },

  getStoredUser() {
    try {
      const u = localStorage.getItem('resumeai_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('resumeai_token');
  }
};
