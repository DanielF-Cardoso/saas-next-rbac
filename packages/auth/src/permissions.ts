import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all') // Admin has full access to all resources

    cannot(['transfer_ownership', 'update'], 'Organization') // Admin cannot transfer ownership of the organization
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    }) // Admin can transfer ownership or update the organization only if they are the owner
  },
  MEMBER(user, { can }) {
    can('get', 'User') // Members can view user details
    can(['create', 'get'], 'Project') // Members can create and view projects
    can(['update', 'delete'], 'Project', {
      ownerId: { $eq: user.id },
    }) // Members can update or delete projects they own
  },
  BILLING(_, { can }) {
    can('manage', 'Billing') // Billing role can manage billing-related resources
  },
}
