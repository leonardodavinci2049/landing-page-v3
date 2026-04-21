import { createLogger } from "@/core/logger";
import dbService from "@/database/dbConnection";

const logger = createLogger("app-bootstrap");

export async function register() {
	if (process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const isDatabaseConnected = await dbService.ping();

	if (!isDatabaseConnected) {
		logger.error("Bootstrap: falha ao validar conexão com o banco de dados");
		return;
	}

	logger.info("Bootstrap: conexão com o banco de dados validada com sucesso");
}
