const { query, isConnected } = require('../config/database');

const inMemoryUsers = [
  {
    _id: 'demo-user-123',
    id: 'demo-user-123',
    name: 'Alex Chen',
    email: 'demo@nexthire.ai',
    password: '$2a$10$demo_hashed_password_bypass',
    targetRole: 'Senior Full-Stack Engineer',
    isDemo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'demo-user-456',
    id: 'demo-user-456',
    name: 'Alex Chen',
    email: 'demo@resumeai.io',
    password: '$2a$10$demo_hashed_password_bypass',
    targetRole: 'Senior Full-Stack Engineer',
    isDemo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

class UserModel {
  static async findOne(criteria = {}) {
    if (isConnected()) {
      if (criteria.email) {
        const res = await query('SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1', [criteria.email]);
        if (res && res.rows.length > 0) {
          const row = res.rows[0];
          return {
            _id: row.id,
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password,
            targetRole: row.target_role,
            profile: row.profile || {},
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          };
        }
        return null;
      }
      if (criteria._id || criteria.id) {
        const id = criteria._id || criteria.id;
        const res = await query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
        if (res && res.rows.length > 0) {
          const row = res.rows[0];
          return {
            _id: row.id,
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password,
            targetRole: row.target_role,
            profile: row.profile || {},
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          };
        }
        return null;
      }
    }

    // In-memory fallback
    if (criteria.email) {
      return inMemoryUsers.find(u => u.email.toLowerCase() === criteria.email.toLowerCase()) || null;
    }
    if (criteria._id || criteria.id) {
      const id = criteria._id || criteria.id;
      return inMemoryUsers.find(u => u._id === id || u.id === id) || null;
    }
    return null;
  }

  static async findById(id) {
    return this.findOne({ id });
  }

  static async create(userData) {
    const id = 'user-' + Date.now();
    if (isConnected()) {
      const res = await query(
        `INSERT INTO users (id, name, email, password, target_role, profile)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          id,
          userData.name,
          userData.email.toLowerCase(),
          userData.password,
          userData.targetRole || 'Software Engineer',
          JSON.stringify(userData.profile || {}),
        ]
      );
      if (res && res.rows.length > 0) {
        const row = res.rows[0];
        return {
          _id: row.id,
          id: row.id,
          name: row.name,
          email: row.email,
          password: row.password,
          targetRole: row.target_role,
          profile: row.profile || {},
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        };
      }
    }

    // In-memory fallback
    const newUser = {
      _id: id,
      id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      targetRole: userData.targetRole || 'Software Engineer',
      profile: userData.profile || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryUsers.push(newUser);
    return newUser;
  }

  static async findByIdAndUpdate(id, updateData, options = {}) {
    if (isConnected()) {
      const res = await query(
        `UPDATE users
         SET name = COALESCE($1, name),
             target_role = COALESCE($2, target_role),
             profile = COALESCE($3, profile),
             updated_at = NOW()
         WHERE id = $4
         RETURNING *`,
        [
          updateData.name || null,
          updateData.targetRole || null,
          updateData.profile ? JSON.stringify(updateData.profile) : null,
          id,
        ]
      );
      if (res && res.rows.length > 0) {
        const row = res.rows[0];
        return {
          _id: row.id,
          id: row.id,
          name: row.name,
          email: row.email,
          targetRole: row.target_role,
          profile: row.profile || {},
          updatedAt: row.updated_at,
        };
      }
    }

    // In-memory fallback
    const idx = inMemoryUsers.findIndex(u => u._id === id || u.id === id);
    if (idx !== -1) {
      inMemoryUsers[idx] = { ...inMemoryUsers[idx], ...updateData, updatedAt: new Date() };
      return inMemoryUsers[idx];
    }
    return null;
  }
}

module.exports = {
  UserModel,
  inMemoryUsers,
};
