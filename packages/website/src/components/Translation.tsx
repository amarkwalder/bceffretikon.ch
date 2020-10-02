import React from 'react'

import * as Translations from '../plugins/Translation'

type TranslationContextProps = {
    defaultLanguage: string
    availableLanguages: string[]
    translations: Translations.TranslationCode[]
    tr: (code: string, language?: string) => string | undefined
}

export const TranslationContext = React.createContext<TranslationContextProps>({
    defaultLanguage: '',
    availableLanguages: [],
    translations: [],
    tr: (code: string, language?: string): string | undefined => Translations.tr(code, language || '', []),
})

type TranslationProps = {
    defaultLanguage: string
    availableLanguages: string[]
    translations: Translations.TranslationCode[]
    currentLanguage: string
}

export const Translation: React.FC<TranslationProps> = ({
    children,
    translations,
    currentLanguage,
    defaultLanguage,
    availableLanguages,
}) => {
    const tr = (code: string, language?: string): string | undefined =>
        Translations.tr(code, language ? language : currentLanguage, translations)

    return (
        <TranslationContext.Provider
            value={{
                defaultLanguage: defaultLanguage,
                availableLanguages: availableLanguages,
                translations: translations,
                tr: tr,
            }}
        >
            {children}
        </TranslationContext.Provider>
    )
}
