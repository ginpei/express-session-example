/**
 * @typedef {{
 *   id: string;
 *   count: number;
 * }} Session
 */

/** @type {Map<string, Session>} */
const fakeSessions = new Map();

module.exports = {
  /**
   * @returns {Session}
   */
  createSession() {
    return {
      id: generateId(),
      count: 1,
    };
  },

  /**
   * @param {Session} session
   * @returns {void}
   */
  saveSession(session) {
    fakeSessions.set(session.id, session);
  },

  /**
   * @param {string} id
   * @returns {Session | null}
   */
  loadSession(id) {
    const session = fakeSessions.get(id) ?? null;
    return session;
  },
};

function generateId() {
  return Math.random().toFixed(32).slice(2);
}
