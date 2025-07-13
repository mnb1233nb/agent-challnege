import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { simpleCalculator } from "./agents/calculator-agent/simple-calculator";

export const mastra = new Mastra({
	workflows: {}, // No workflows for now
	agents: { simpleCalculator },
	logger: new PinoLogger({
		name: "Mastra",
		level: "info",
	}),
	server: {
		port: 8080,
		timeout: 10000,
	},
});
