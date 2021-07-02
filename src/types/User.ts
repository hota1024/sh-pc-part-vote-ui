import { ModelBase } from './ModelBase'
import { Part, PartType } from './Part'

/**
 * UserVoteStatus type.
 */
export type UserVoteStatus = Record<PartType, Part | undefined>

/**
 * User type.
 */
export type User = ModelBase & {
  email: string
  status: UserVoteStatus
}
