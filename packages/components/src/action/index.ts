import Action from './Action'
import ActionGroup from './Group'
import type { ActionGroupInstance, ActionGroupProps, ActionInstance, ActionProps } from './typings'
import { actionGroupProps, actionProps } from './typings'

Action.Group = ActionGroup

export { Action, actionProps }
export { ActionGroup, actionGroupProps }

export type { ActionProps, ActionInstance }
export type { ActionGroupProps, ActionGroupInstance }
