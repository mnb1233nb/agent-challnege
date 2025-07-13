import { youtubeSummaryAgent } from "./src/mastra/agents/youtube-summary-agent/youtube-summary-agent";
import { youtubeSummaryTool } from "./src/mastra/agents/youtube-summary-agent/youtube-summary-tool";

async function testYouTubeAgent() {
	console.log("🧪 Testing YouTube Summary Agent...\n");

	// Test 1: Tool execution
	console.log("1️⃣ Testing Tool Execution:");
	try {
		const result = await youtubeSummaryTool.execute({
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			summaryType: "detailed",
			includeTranscript: true,
			includeTimestamps: true,
		});

		if (result.success) {
			console.log("✅ Tool execution successful!");
			console.log(`Video Title: ${result.videoInfo.title}`);
			console.log(`Channel: ${result.videoInfo.channelTitle}`);
			console.log(`Duration: ${result.videoInfo.duration}`);
			console.log(`Has Transcript: ${result.hasTranscript}`);
			console.log(`Summary Type: ${result.summaryType}`);
		} else {
			console.log(`❌ Tool execution failed: ${result.error}`);
		}
	} catch (error) {
		console.log(`❌ Tool execution error: ${error}`);
	}

	console.log("\n" + "=".repeat(50) + "\n");

	// Test 2: Agent execution
	console.log("2️⃣ Testing Agent Execution:");
	try {
		const result = await youtubeSummaryAgent.run({
			message: "Please summarize this YouTube video: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
		});

		console.log("✅ Agent execution successful!");
		console.log("Agent Response:");
		console.log(result.content);
	} catch (error) {
		console.log(`❌ Agent execution error: ${error}`);
	}

	console.log("\n" + "=".repeat(50) + "\n");

	// Test 3: Different summary types
	console.log("3️⃣ Testing Different Summary Types:");
	
	const summaryTypes = ["brief", "detailed", "full"] as const;
	
	for (const summaryType of summaryTypes) {
		console.log(`\nTesting ${summaryType} summary:`);
		try {
			const result = await youtubeSummaryTool.execute({
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				summaryType,
				includeTranscript: true,
				includeTimestamps: true,
			});

			if (result.success) {
				console.log(`✅ ${summaryType} summary successful!`);
				console.log(`Overview: ${result.summary.overview}`);
			} else {
				console.log(`❌ ${summaryType} summary failed: ${result.error}`);
			}
		} catch (error) {
			console.log(`❌ ${summaryType} summary error: ${error}`);
		}
	}

	console.log("\n" + "=".repeat(50) + "\n");

	// Test 4: URL parsing
	console.log("4️⃣ Testing URL Parsing:");
	
	const testUrls = [
		"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"https://youtu.be/dQw4w9WgXcQ",
		"https://www.youtube.com/embed/dQw4w9WgXcQ",
		"https://www.youtube.com/v/dQw4w9WgXcQ",
		"https://www.youtube.com/shorts/dQw4w9WgXcQ",
	];

	for (const url of testUrls) {
		try {
			const result = await youtubeSummaryTool.execute({
				url,
				summaryType: "brief",
				includeTranscript: false,
				includeTimestamps: false,
			});

			if (result.success) {
				console.log(`✅ URL parsing successful for: ${url}`);
			} else {
				console.log(`❌ URL parsing failed for: ${url} - ${result.error}`);
			}
		} catch (error) {
			console.log(`❌ URL parsing error for: ${url} - ${error}`);
		}
	}

	console.log("\n✅ All tests completed!");
}

// Run the test
testYouTubeAgent().catch(console.error); 