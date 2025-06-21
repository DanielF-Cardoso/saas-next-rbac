import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({
  role: 'MEMBER',
  id: 'b7e2e8e2-7c2a-4e7d-9b6e-1f3c2e2a9c1b',
})

const project = projectSchema.parse({
  id: 'f3a1d5b4-2e6c-4f8a-9d7e-8c2b1a4e5f6d',
  ownerId: 'b7e2e8e2-7c2a-4e7d-9b6e-1f3c2e2a9c1b',
})

console.log(ability.can('get', 'Billing'))
console.log(ability.can('create', 'Invite'))
console.log(ability.can('delete', project))
