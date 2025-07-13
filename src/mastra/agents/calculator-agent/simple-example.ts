import { simpleCalculator } from './simple-calculator';

async function simpleExample() {
  console.log('=== Simple Calculator Example ===\n');

  const testExpressions = [
    '2 + 3 * 4',
    '10 + 5',
    '20 - 7',
    '6 * 8',
    '100 / 4',
    '(2 + 3) * 4',
    '2^3', // This will fail as ^ is not supported
    'invalid expression'
  ];

  for (const expression of testExpressions) {
    console.log(`Calculating: ${expression}`);
    
    try {
      const result = await simpleCalculator.calculate({ expression });
      
      if (result.success) {
        console.log(`✅ Result: ${result.result}`);
      } else {
        console.log(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Exception: ${error}`);
    }
    
    console.log('---');
  }

  console.log('✅ Simple calculator example completed!');
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  simpleExample().catch(console.error);
}

export { simpleExample }; 