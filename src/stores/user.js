import { atomWithImmer } from 'jotai/immer'
import { loadable } from 'jotai/utils'

import { tokenHelper } from '@utils/helper'

/**
 * @type {() => Promise<{name: string, admin: boolean}>}
 */
const fetchUser = () => {
    const token = tokenHelper.get()
    if (!token) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({ name: 'John', admin: true }), 200)
            // setTimeout(() => reject(), 2000)
        })
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({ name: 'John', admin: true }), 200)
        })
    }
}

const userAsyncAtom = atomWithImmer(async () => {
    try {
        const user = await fetchUser()
        return user
    } catch {
        return null
    }
})

export const loadableUserAtom = loadable(userAsyncAtom)

export default userAsyncAtom
