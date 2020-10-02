// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const removeNull = (obj: any): any =>
    Object.keys(obj)
        .filter(k => obj[k] != null) // Remove undef. and null.
        .reduce(
            (newObj, k) =>
                typeof obj[k] === 'object'
                    ? { ...newObj, [k]: removeNull(obj[k]) } // Recurse.
                    : { ...newObj, [k]: obj[k] }, // Copy value.
            {},
        )

export const removeTrailingSlash = (path: string): string => (path === `/` ? path : path.replace(/\/$/, ``))
export const removeSuffixSlash = (path: string): string => (!path.startsWith('/') ? path : path.substring(1))
