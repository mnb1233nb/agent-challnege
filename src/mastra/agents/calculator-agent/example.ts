import { CalculatorAgent } from './calculator-agent';
import { CalculatorWorkflow } from './calculator-workflow';

async function example() {
  console.log('=== Calculator Agent Example ===\n');

  // Example 1: Using the calculator agent directly
  console.log('1. Using Calculator Agent directly:');
  const calculatorAgent = new CalculatorAgent();
  
  try {
    const result = await calculatorAgent.execute({ calculation: '2 + 3 * 4' });
    console.log(`Input: ${result.calculation}`);
    console.log(`Result: ${result.result}`);
    console.log(`Explanation: ${result.explanation}\n`);
  } catch (error) {
    console.error('Error:', error);
  }

  // Example 2: Using the calculator workflow
  console.log('2. Using Calculator Workflow:');
  const calculatorWorkflow = new CalculatorWorkflow();
  
  try {
    const workflowResult = await calculatorWorkflow.execute({
      calculations: [
        '10 + 5',
        '20 - 7',
        '6 * 8',
        '100 / 4',
        '2^3' // This will fail as ^ is not supported
      ]
    });

    console.log('Workflow Results:');
    workflowResult.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.calculation} = ${result.result}`);
      console.log(`   ${result.explanation}`);
    });
  } catch (error) {
    console.error('Workflow Error:', error);
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  example().catch(console.error);
}

export { example }; 