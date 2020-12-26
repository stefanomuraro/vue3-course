import { ref } from "vue";

const useDebounce = () => {
    const timeout = ref('')

    const debounce = (func, wait = 1000) => {
        clearTimeout(timeout.value)
        timeout.value = setTimeout(func, wait);
    }

    return debounce
}

export default useDebounce