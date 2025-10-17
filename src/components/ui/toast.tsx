import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
}

interface ToastContextType {
	toasts: Toast[];
	addToast: (message: string, type?: ToastType, duration?: number) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback(
		(message: string, type: ToastType = "info", duration = 3000) => {
			const id = Math.random().toString(36).substr(2, 9);
			const newToast: Toast = { id, message, type, duration };

			setToasts(prev => [...prev, newToast]);

			// Auto remove toast after duration
			if (duration > 0) {
				setTimeout(() => {
					removeToast(id);
				}, duration);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const removeToast = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

function ToastContainer() {
	const { toasts, removeToast } = useToast();

	if (toasts.length === 0) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 space-y-2">
			{toasts.map(toast => (
				<ToastItem
					key={toast.id}
					toast={toast}
					onRemove={() => removeToast(toast.id)}
				/>
			))}
		</div>
	);
}

function ToastItem({
	toast,
	onRemove,
}: {
	toast: Toast;
	onRemove: () => void;
}) {
	const getIcon = () => {
		switch (toast.type) {
			case "success":
				return <CheckCircle className="h-5 w-5 text-green-500" />;
			case "error":
				return <AlertCircle className="h-5 w-5 text-red-500" />;
			case "warning":
				return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
			case "info":
			default:
				return <Info className="h-5 w-5 text-blue-500" />;
		}
	};

	const getBackgroundColor = () => {
		switch (toast.type) {
			case "success":
				return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
			case "error":
				return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
			case "warning":
				return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800";
			case "info":
			default:
				return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
		}
	};

	return (
		<div
			className={`
				min-w-80 max-w-sm p-4 rounded-lg border shadow-lg
				${getBackgroundColor()}
				animate-in slide-in-from-right duration-300
			`}
		>
			<div className="flex items-start gap-3">
				{getIcon()}
				<div className="flex-1">
					<p className="text-sm font-medium">{toast.message}</p>
				</div>
				<button
					onClick={onRemove}
					className="text-muted-foreground hover:text-foreground transition-colors"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
