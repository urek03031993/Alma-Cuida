import { derived, writable } from "svelte/store";

function createLoadingStore() {
    const { subscribe, set, update } = writable(false);

    return {
        subscribe,
        start: () => update(() => true),
        stop: () => update(() => false),
        reset: () => set(false),        
    };
}

export const loading = createLoadingStore();


//// Toast /////////////////////////////////////////////////////////////////////////////////
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
	duration?: number;
	createdAt: number;
}


function ToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function add(message: string, type: ToastType = 'info') {
		const id = crypto.randomUUID();
		const toast: Toast = {
			id,
			type,
			message,
			createdAt: Date.now()
		};

		update((toasts) => [...toasts, toast]);

		return id;
	}

	function remove(id: string) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}

	function clear() {
		update(() => []);
	}

	return {
		subscribe,
		add,
		remove,
		clear,
		success: (msg: string) => add(msg, 'success'),
		error: (msg: string) => add(msg, 'error'),
		info: (msg: string) => add(msg, 'info')
	};
}

export const toastStore = ToastStore();
export const toasts = derived(toastStore, ($toasts) => $toasts);