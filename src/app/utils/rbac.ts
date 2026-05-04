/**
 * Role-Based Access Control Utilities
 */

export type UserRole = 'admin' | 'doctor' | 'security_officer';

export interface Permission {
  canEdit: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canViewSensitiveData: boolean;
  canExportData: boolean;
}

/**
 * Get permissions based on user role
 */
export const getPermissions = (role: UserRole): Permission => {
  const permissions: Record<UserRole, Permission> = {
    admin: {
      canEdit: true,
      canDelete: true,
      canManageUsers: true,
      canViewSensitiveData: true,
      canExportData: true,
    },
    doctor: {
      canEdit: false, // Read-only
      canDelete: false,
      canManageUsers: false,
      canViewSensitiveData: true, // Can view patient data
      canExportData: false, // Cannot export
    },
    security_officer: {
      canEdit: false,
      canDelete: false,
      canManageUsers: false,
      canViewSensitiveData: true,
      canExportData: false,
    },
  };

  return permissions[role];
};

/**
 * Check if user can perform an action
 */
export const canPerformAction = (role: UserRole, action: keyof Permission): boolean => {
  const permissions = getPermissions(role);
  return permissions[action];
};

/**
 * Get role-specific UI label
 */
export const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    admin: 'Administrator',
    doctor: 'Doctor',
    security_officer: 'Security Officer',
  };
  return labels[role];
};

/**
 * Get role-specific color
 */
export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    admin: 'bg-[#E5A50A]',
    doctor: 'bg-[#1A5FB4]',
    security_officer: 'bg-[#C01C28]',
  };
  return colors[role];
};

/**
 * Check if user is admin
 */
export const isAdmin = (role: UserRole): boolean => role === 'admin';

/**
 * Check if user is doctor
 */
export const isDoctor = (role: UserRole): boolean => role === 'doctor';
