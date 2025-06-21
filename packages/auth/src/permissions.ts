import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'

type Roles = 'ADMIN' | 'MEMBER'
type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Roles, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all') // Admins can manage everything
  },
  MEMBER(_, { can }) {
    can('invite', 'User') // Members can invite Users
  },
}
