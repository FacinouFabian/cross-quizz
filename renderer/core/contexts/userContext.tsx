import * as React from 'react'

// All user action
type Action = { type: 'UPDATE_USER'; payload?: Partial<User> }

type ContextProps = [Partial<User>, React.Dispatch<Action>]

type ProviderProps = {
  reducer: any
  initialState: any
}

type Reducer = (prevState: Partial<User>, action: Action) => Partial<User>

// React expects the context to be created with default values
// This object contain Provider and Consumer
export const UserContext = React.createContext<ContextProps | null>(null)

/**
 * @objectives
 * Storing the user's language preference in localStorage
 * Checking value of the locale URL parameter on every client-side route change
 * Synchronizing the context state with the locale embedded in the URL
 */
export const UserProvider: React.FunctionComponent<ProviderProps> = ({ reducer, initialState, children }) => {
  // full control over reduce and initial state data inside our app
  const [state, dispatch] = React.useReducer<Reducer>(reducer, initialState)

  return (
    // nice trick to let reducer available in any component
    <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>
  )
}

// A custom hook to access our minimalistic state management in any component with less amount of code
export const useUser = (): any => React.useContext(UserContext)

export default {
  initialState: {
    id: undefined,
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
  /**
   * @description designing the user state shape
   * @param state current data
   * @param action action to handle
   */
  reducer(state: Partial<User>, action: Action): Partial<User> {
    switch (action.type) {
      case 'UPDATE_USER':
        return {
          ...state,
          id: action?.payload?.id,
          email: action?.payload?.email,
          firstname: action?.payload?.firstname,
          lastname: action?.payload?.lastname,
          createdAt: action?.payload?.createdAt,
          updatedAt: action?.payload?.updatedAt,
        }
      default:
        return state
    }
  },
}
