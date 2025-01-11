import { createContext, ReactNode } from "react";

interface ProcessContextProps {
    id: number;
}
export const ProcessContext = createContext<ProcessContextProps>({ id: -1 });

export const ProcessProvider = ({ id, children }: { id: number, children: ReactNode }) => {
    return (
        <ProcessContext.Provider value={{ id }}>
            {children}
        </ProcessContext.Provider>
    );
};