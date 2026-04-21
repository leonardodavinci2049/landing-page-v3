export default function Loading() {
	return (
		<div className="safe-area-inset-x safe-area-inset-y flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-pink-400 via-purple-300 to-rose-200 px-4 py-8 sm:px-6">
			<div className="xs:max-w-sm w-full max-w-xs animate-pulse space-y-4 text-center sm:max-w-md sm:space-y-4">
				<div className="flex justify-center">
					<div className="h-[100px] w-[100px] rounded-full bg-white/40 shadow-lg sm:h-[140px] sm:w-[140px]" />
				</div>

				<div className="space-y-2 sm:space-y-3">
					<div className="mx-auto h-8 w-3/4 rounded-lg bg-white/40" />
					<div className="mx-auto h-6 w-1/2 rounded-lg bg-white/40" />
					<div className="mx-auto h-4 w-5/6 rounded bg-white/30" />
					<div className="mx-auto h-4 w-4/6 rounded bg-white/30" />
				</div>

				<div className="space-y-3">
					<div className="h-16 rounded-2xl bg-white/60 shadow-xl sm:rounded-3xl" />
					<div className="h-16 rounded-2xl bg-white/60 shadow-xl sm:rounded-3xl" />
				</div>

				<div className="mx-auto h-20 w-full rounded-2xl bg-white/30" />
			</div>
		</div>
	);
}
