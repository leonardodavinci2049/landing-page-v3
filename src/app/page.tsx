import Image from "next/image";
import { AvailableSpotsCounter } from "@/app/_components/available-spots-counter";
import { GroupLinkCard } from "@/app/_components/group-link-card";
import { NewMemberNotification } from "@/app/_components/new-member-notification";
import { env } from "@/lib/env";
import brazilianNames from "../mock/brazilian-names.json";

const memberNames = brazilianNames.names.map(({ name }) => name);

const groupLinks = {
	whatsapp: env.WHATSAPP_URL,
	telegram: "https://t.me/promosdamih",
};

export default function HomePage() {
	return (
		<div className="safe-area-inset-x safe-area-inset-y flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-pink-400 via-purple-300 to-rose-200 px-4 py-8 sm:px-6">
			<div className="xs:max-w-sm w-full max-w-xs space-y-4 text-center sm:max-w-md sm:space-y-4">
				<div className="flex justify-center">
					<Image
						src="/logo-promosdamih.jpeg"
						alt="Promos da Mih"
						width={100}
						height={100}
						className="rounded-full shadow-lg sm:h-35 sm:w-35"
					/>
				</div>

				<div className="space-y-2 sm:space-y-3">
					<h1 className="animate-grow-shrink mobile-small-title text-3xl leading-tight font-bold text-gray-900 sm:text-3xl">
						👀 ENQUANTO <br />
						VOCÊ LÊ ISSO
					</h1>

					<p className="mobile-small xs:px-2 xs:text-base px-1 text-sm leading-relaxed text-gray-600 sm:px-0 sm:text-lg">
						tem gente pagando metade do preço <br />
						Quer saber como? Entra no grupo.
					</p>
				</div>

				<div className="space-y-3">
					<GroupLinkCard platform="whatsapp" href={groupLinks.whatsapp} />
					<GroupLinkCard platform="telegram" href={groupLinks.telegram} />
				</div>

				<AvailableSpotsCounter />

				<div className="space-y-2 sm:space-y-2">
					<p className="text-base font-semibold text-gray-700 sm:text-lg">
						Conexões diretas com:
					</p>

					<div className="flex justify-center rounded-xl bg-white p-3 shadow-lg sm:rounded-2xl sm:p-4">
						<Image
							src="/merchant.png"
							alt="Merchants parceiros"
							width={300}
							height={69}
							className="h-auto w-auto max-w-full object-contain"
						/>
					</div>
				</div>
			</div>

			<NewMemberNotification names={memberNames} />
		</div>
	);
}
