type GroupPlatform = "whatsapp" | "telegram";

type GroupLinkCardProps = {
	href: string;
	platform: GroupPlatform;
};

const platformContent = {
	whatsapp: {
		title: "Entre no grupo do WhatsApp",
		badge: "GRUPO VIP Vagas limitadas!",
		accentClassName: "bg-[#25D366]",
		badgeClassName: "text-[#25D366]",
		arrowClassName: "group-active:text-green-500 sm:group-hover:text-green-500",
	},
	telegram: {
		title: "Entre no grupo do Telegram",
		badge: "GRUPO VIP Vagas limitadas!",
		accentClassName: "bg-[#0088cc]",
		badgeClassName: "text-[#0088cc]",
		arrowClassName: "group-active:text-blue-500 sm:group-hover:text-blue-500",
	},
} satisfies Record<
	GroupPlatform,
	{
		title: string;
		badge: string;
		accentClassName: string;
		badgeClassName: string;
		arrowClassName: string;
	}
>;

export function GroupLinkCard({ href, platform }: GroupLinkCardProps) {
	const content = platformContent[platform];

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xl transition-shadow duration-300 active:shadow-lg sm:rounded-3xl sm:p-4 sm:hover:shadow-2xl">
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group touch-target flex w-full items-center justify-between rounded-xl p-2 text-left transition-all duration-200 select-none active:bg-gray-100 sm:rounded-2xl sm:hover:bg-gray-50"
			>
				<div className="flex items-center space-x-3 sm:space-x-4">
					<div
						className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg sm:h-10 sm:w-10 ${content.accentClassName}`}
					>
						{platform === "whatsapp" ? <WhatsappIcon /> : <TelegramIcon />}
					</div>
					<div className="text-left">
						<div className="text-sm font-bold text-gray-900 sm:text-base">
							{content.title}
						</div>
						<div
							className={`text-xs font-bold uppercase ${content.badgeClassName}`}
						>
							{content.badge}
						</div>
					</div>
				</div>
				<ExternalArrowIcon className={content.arrowClassName} />
			</a>
		</div>
	);
}

function ExternalArrowIcon({ className }: { className: string }) {
	return (
		<svg
			className={`h-4 w-4 text-gray-400 transition-colors duration-200 sm:h-5 sm:w-5 ${className}`}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
			/>
		</svg>
	);
}

function WhatsappIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="h-4 w-4 text-white sm:h-5 sm:w-5"
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
			className="h-4 w-4 text-white sm:h-5 sm:w-5"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 2.1 11.75c-1.21-.35-1.22-1.22.26-1.81L21.26 2.2c1.01-.4 1.9.24 1.48 1.86L20.18 17.9c-.18.97-.72 1.21-1.47.75L14.51 16.5 11.9 19c-.39.39-.71.71-1.44.71-.94 0-.78-.35-.78-.78z" />
		</svg>
	);
}
