/**
 * Authentication utilities using localStorage
 * Simulates user authentication for the application
 */

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

const USERS_KEY = 'fortune_users';
const CURRENT_USER_KEY = 'fortune_current_user';

/**
 * Register a new user
 */
export function registerUser(name: string, email: string, password: string): { success: boolean; message: string } {
  try {
    // Get existing users
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Este correo ya está registrado' };
    }
    
    // Create new user
    const newUser: User = {
      name,
      email,
      password, // In a real app, this would be hashed
      createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login after registration
    loginUser(email, password);
    
    return { success: true, message: 'Cuenta creada exitosamente' };
  } catch (error) {
    return { success: false, message: 'Error al crear la cuenta' };
  }
}

/**
 * Login user
 */
export function loginUser(email: string, password: string): { success: boolean; message: string } {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Credenciales incorrectas' };
    }
    
    // Save current user (without password)
    const authUser: AuthUser = {
      name: user.name,
      email: user.email
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    
    return { success: true, message: 'Inicio de sesión exitoso' };
  } catch (error) {
    return { success: false, message: 'Error al iniciar sesión' };
  }
}

/**
 * Logout user
 */
export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Get current logged in user
 */
export function getCurrentUser(): AuthUser | null {
  try {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Get all users (private)
 */
function getUsers(): User[] {
  try {
    const usersStr = localStorage.getItem(USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  } catch (error) {
    return [];
  }
}

