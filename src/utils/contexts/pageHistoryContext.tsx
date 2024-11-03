"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { PageHistoryContextInterface } from './ContextInterfaces';

interface Props {
    children?: ReactNode
}

const PageHistoryContext = createContext<PageHistoryContextInterface>({
    previousPage: '/',
    currentPage: '/',
    updatePageHistory: () => {}
});

export const PageHistoryProvider = ({ children } : Props) => {
    const [previousPage, setPreviousPage] = useState('/');
    const [currentPage, setCurrentPage] = useState('/');

    const updatePageHistory = (newPage : string) => {
        setPreviousPage(currentPage);
        setCurrentPage(newPage);
    };

    return (
        <PageHistoryContext.Provider value={{
            previousPage,
            currentPage,
            updatePageHistory
        }}>
            {children}
        </PageHistoryContext.Provider>
    );
};

export const usePageHistory = () => useContext(PageHistoryContext);
