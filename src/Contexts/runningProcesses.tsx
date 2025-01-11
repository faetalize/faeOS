import { createContext, ReactNode, useState } from "react";
import Process from "../Models/Process";
import Application from "../Models/Application";

interface RunningProcessesContextProps {
    processes: Process[];
    addProcess: (app: Application) => void;
    removeProcess: (id: number) => void;
}

export const runningProcessesContext = createContext<RunningProcessesContextProps>({
    processes: [],
    addProcess: () => { },
    removeProcess: () => { }
});

export const RunningProcessesProvider = ({ children }: { children: ReactNode }) => {
    const [processes, setProcesses] = useState<Process[]>([]);

    const addProcess = (app: Application) => {
        const newProcess: Process = {
            id: Math.floor(Math.random() * 100000),
            app: app,
            startTime: new Date()
        };
        setProcesses([...processes, newProcess]);
    };

    const removeProcess = (id: number) => {
        setProcesses(processes.filter(process => process.id !== id));
    };

    return (
        <runningProcessesContext.Provider value={{ processes, addProcess, removeProcess }}>
            {children}
        </runningProcessesContext.Provider>
    );
};