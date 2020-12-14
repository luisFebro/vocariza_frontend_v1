// GLOBAL VARIABLES TO AVOID PROP-DRILLING
// Use it if a prop requires to pass to more than or equal to 3 diff components down the three.
// Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.
import { useContext as useContextMain, createContext } from "react";

// wrap this in the root main component
export const Provider = ({ children, store }) => {
    return <Context.Provider value={store}>{children}</Context.Provider>;
};

const Context = createContext();
export const useContext = () => useContextMain(Context);
