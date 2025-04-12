// context/LanguageContext.js
'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import en from '@/locales/en.json'
import bn from '@/locales/bn.json'

const translations = { en, bn }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en')

    useEffect(() => {
        const savedLang = localStorage.getItem('lang')
        if (savedLang) setLanguage(savedLang)
    }, [])

    const changeLanguage = (lang) => {
        setLanguage(lang)
        localStorage.setItem('lang', lang)
    }

    const t = translations[language]

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)
