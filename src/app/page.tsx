import Image from "next/image";
import { connection } from "next/server";
import { AvailableSpotsCounter } from "@/app/_components/available-spots-counter";
import { GroupLinkCard } from "@/app/_components/group-link-card";
import { getHomeGroupLinks } from "@/services/db/promo-link";
import brazilianNames from "../mock/brazilian-names.json";
import { NewMemberNotification } from "./_components/new-member-notification";

const memberNames = brazilianNames.names.map(({ name }) => name);

function requireLink(link: string | null | undefined, label: string): string {
	if (link?.trim()) {
		return link;
	}

	throw new Error(`Promo link ${label} não encontrado no banco de dados`);
}

export default async function HomePage() {
	await connection();

	const groupLinks = await getHomeGroupLinks();

	const whatsappLink = requireLink(groupLinks?.whatsapp, "WhatsApp");
	const telegramLink = requireLink(groupLinks?.telegram, "Telegram");

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
					<GroupLinkCard platform="whatsapp" href={whatsappLink} />
					<GroupLinkCard platform="telegram" href={telegramLink} />
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
							loading="eager"
							className="h-auto w-auto max-w-full object-contain"
						/>
					</div>
				</div>
			</div>

			<NewMemberNotification names={memberNames} />
		</div>
	);
}
