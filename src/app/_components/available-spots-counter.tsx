"use client";

import { useEffect, useState } from "react";

function getRandomInitialSpots() {
	return Math.floor(Math.random() * 11) + 20;
}

function getRandomDecrease() {
	return Math.floor(Math.random() * 3) + 1;
}

export function AvailableSpotsCounter() {
	const [availableSpots, setAvailableSpots] = useState(20);

	useEffect(() => {
		setAvailableSpots(getRandomInitialSpots());

		const spotsInterval = window.setInterval(() => {
			setAvailableSpots((previousSpots) => {
				if (previousSpots <= 1) {
					return 1;
				}

				return Math.max(1, previousSpots - getRandomDecrease());
			});
		}, 5000);

		return () => window.clearInterval(spotsInterval);
	}, []);

	return (
		<div
			className={`space-y-2 rounded-2xl p-3 text-center sm:p-5 ${
				availableSpots <= 10 ? "animate-pulse" : ""
			}`}
		>
			<div className="text-xs font-bold tracking-widest text-red-600 uppercase sm:text-sm">
				DISPONÍVEL
			</div>
			<div
				className={`font-black ${
					availableSpots <= 10
						? "animate-bounce text-3xl text-red-800 sm:text-4xl"
						: "text-2xl text-red-700 sm:text-3xl"
				}`}
			>
				{availableSpots} {availableSpots === 1 ? "VAGA" : "VAGAS"}
			</div>
			<div className="text-sm font-semibold text-gray-700 sm:text-base">
				Já somos + 20 mil membros.
			</div>
			{availableSpots <= 20 && (
				<div className="animate-pulse text-xs font-bold text-red-800 uppercase">
					⚠️ ÚLTIMAS VAGAS!
				</div>
			)}
		</div>
	);
}
