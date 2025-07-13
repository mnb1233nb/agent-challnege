# Calculator Agent

A simple calculator agent that can perform basic arithmetic operations using the Mastra framework.

## Features

- Basic arithmetic operations (+, -, *, /)
- Support for parentheses and order of operations
- Input sanitization for security
- Error handling for invalid expressions
- Workflow support for batch calculations

## Usage

### Basic Usage

```typescript
import { CalculatorAgent } from './calculator-agent';

const agent = new CalculatorAgent();
const result = await agent.execute({ calculation: '2 + 3 * 4' });
console.log(result.result); // 14
```

### Using the Workflow

```typescript
import { CalculatorWorkflow } from './calculator-workflow';

const workflow = new CalculatorWorkflow();
const results = await workflow.execute({
  calculations: ['10 + 5', '20 - 7', '6 * 8']
});

results.results.forEach(result => {
  console.log(`${result.calculation} = ${result.result}`);
});
```

## Supported Operations

- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Parentheses: `()` for grouping
- Decimal numbers: `3.14`

## Security

The calculator tool sanitizes input to only allow safe mathematical operations, preventing code injection attacks.

## Example

Run the example file to see the calculator agent in action:

```bash
npx ts-node src/mastra/agents/calculator-agent/example.ts
```

## Files

- `calculator-tool.ts` - The core calculator tool
- `calculator-agent.ts` - The calculator agent
- `calculator-workflow.ts` - Workflow for batch calculations
- `example.ts` - Usage examples
- `README.md` - This documentation 