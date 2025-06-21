import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteSomeoneElse = ability.can('delete', 'User')

const UserCannotDeleteOtherUsers = ability.cannot('delete', 'User')

console.log('User can invite someone else:', userCanInviteSomeoneElse)
console.log('User can delete someone else:', userCanDeleteSomeoneElse)
console.log('User cannot delete other users:', UserCannotDeleteOtherUsers)
