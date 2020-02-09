import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage, StyleSheet } from 'react-native';

export const Context = createContext(null);

export default ({ children }) => {
    const [providerNumber, setProviderNumber] = useLocalStorage('provider', '3177735876');
    const [contractions, setContractions] = useLocalStorage('contractions', []);

    return (
        <Context.Provider value={{
            contractions,
            addContraction: c => {
                setContractions([
                    ...contractions,
                    c,
                ]);
            },
            clearContractions: () => setContractions([]),
            providerNumber,
            setProviderNumber
        }}>
            {children}
        </Context.Provider>
    )
};

//CUSTOM HOOK
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);

   useEffect(() => {
        getStorageValue();
    }, []);

    async function getStorageValue() {
        let value = initialValue;
        try {
            const item = await AsyncStorage.getItem(key);
            value = item ? JSON.parse(item) : initialValue;
        } catch (e) {
                console.log(error);
        } finally {
            setStoredValue(value);
        }
    }

    const setValue = (valueToStore) => {
        try {
            setStoredValue(valueToStore);
            AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
