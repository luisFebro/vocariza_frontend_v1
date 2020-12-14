import { getSteps } from "./store";

export default function useGlobal() {
    return {
        ...getSteps(),
    };
}
