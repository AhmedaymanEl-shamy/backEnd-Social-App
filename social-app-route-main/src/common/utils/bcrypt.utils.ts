import * as bcrypt from "bcrypt"

/**
 *
 * @param password
 * @returns hashed password
 */
export async function hash(password: string) {
    return await bcrypt.hash(password, 10)
}

/**
 *
 * @param password -> come from FE
 * @param hashedPassword -> come from BE
 * @returns promise of boolean
 */
export async function compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
}