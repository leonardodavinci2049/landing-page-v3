"use client";

import { useEffect, useRef, useState } from "react";

type NotificationType = "whatsapp" | "telegram";

type NotificationState = {
	name: string;
	type: NotificationType;
	visible: boolean;
};

type NewMemberNotificationProps = {
	names: string[];
};

const notificationSequence = [2, 1, 3];

export function NewMemberNotification({ names }: NewMemberNotificationProps) {
	const [currentNotification, setCurrentNotification] =
		useState<NotificationState>({
			name: "",
			type: "whatsapp",
			visible: false,
		});
	const sequenceIndexRef = useRef(0);
	const whatsCountRef = useRef(0);
	const hideTimeoutRef = useRef<number | null>(null);

	useEffect(() => {
		if (names.length === 0) {
			return;
		}

		const showNotification = () => {
			const randomIndex = Math.floor(Math.random() * names.length);
			const selectedName = names[randomIndex] ?? "";
			const currentSequenceIndex = sequenceIndexRef.current;
			const currentWhatsCount = whatsCountRef.current;

			let type: NotificationType = "whatsapp";

			if (currentWhatsCount < notificationSequence[currentSequenceIndex]) {
				whatsCountRef.current = currentWhatsCount + 1;
			} else {
				type = "telegram";
				sequenceIndexRef.current =
					(currentSequenceIndex + 1) % notificationSequence.length;
				whatsCountRef.current = 0;
			}

			setCurrentNotification({ name: selectedName, type, visible: true });

			if (hideTimeoutRef.current !== null) {
				window.clearTimeout(hideTimeoutRef.current);
			}

			hideTimeoutRef.current = window.setTimeout(() => {
				setCurrentNotification((previousNotification) => ({
					...previousNotification,
					visible: false,
				}));
			}, 1500);
		};

		const initialTimeout = window.setTimeout(showNotification, 3000);
		const notificationInterval = window.setInterval(showNotification, 10000);

		return () => {
			window.clearTimeout(initialTimeout);
			window.clearInterval(notificationInterval);

			if (hideTimeoutRef.current !== null) {
				window.clearTimeout(hideTimeoutRef.current);
			}
		};
	}, [names]);

	if (!currentNotification.name) {
		return null;
	}

	return (
		<div
			role="status"
			aria-live="polite"
			aria-atomic="true"
			className={`fixed right-4 bottom-4 z-50 transform transition-all duration-700 ease-in-out ${
				currentNotification.visible
					? "translate-x-0 scale-100 opacity-100"
					: "translate-x-full scale-95 opacity-0"
			}`}
		>
			{currentNotification.type === "whatsapp" ? (
				<div className="flex max-w-sm items-center space-x-3 rounded-lg border-l-4 border-[#25D366] bg-white px-4 py-3 shadow-xl">
					<div className="shrink-0">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
							<WhatsappIcon />
						</div>
					</div>
					<div className="min-w-0 flex-1">
						<div className="text-sm font-semibold text-[#25D366]">
							WhatsApp Promos da Mih
						</div>
						<div className="text-sm text-gray-600">
							<span className="font-bold text-gray-900">
								{currentNotification.name}
							</span>{" "}
							entrou no grupo
						</div>
					</div>
					<div className="shrink-0">
						<div className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]"></div>
					</div>
				</div>
			) : (
				<div className="flex max-w-sm items-center space-x-3 rounded-lg border-l-4 border-[#0088cc] bg-white px-4 py-3 shadow-xl">
					<div className="shrink-0">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc]">
							<TelegramIcon />
						</div>
					</div>
					<div className="min-w-0 flex-1">
						<div className="text-sm font-semibold text-[#0088cc]">
							Telegram Promos da Mih
						</div>
						<div className="text-sm text-gray-600">
							<span className="font-bold text-gray-900">
								{currentNotification.name}
							</span>{" "}
							entrou no grupo
						</div>
					</div>
					<div className="shrink-0">
						<div className="h-2 w-2 animate-pulse rounded-full bg-[#0088cc]"></div>
					</div>
				</div>
			)}
		</div>
	);
}

function WhatsappIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="h-5 w-5 text-white"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
		</svg>
	);
}

function TelegramIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="h-5 w-5 text-white"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 2.1 11.75c-1.21-.35-1.22-1.22.26-1.81L21.26 2.2c1.01-.4 1.9.24 1.48 1.86L20.18 17.9c-.18.97-.72 1.21-1.47.75L14.51 16.5 11.9 19c-.39.39-.71.71-1.44.71-.94 0-.78-.35-.78-.78z" />
		</svg>
	);
}
