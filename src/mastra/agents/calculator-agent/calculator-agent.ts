import { Agent } from '@mastra/core';
import { CalculatorTool } from './calculator-tool';

export interface CalculatorAgentInput {
  calculation: string;
}

export interface CalculatorAgentOutput {
  result: number;
  calculation: string;
  explanation: string;
}

export class CalculatorAgent extends Agent<CalculatorAgentInput, CalculatorAgentOutput> {
  name = 'calculator-agent';
  description = 'A simple calculator agent that can perform basic arithmetic operations';

  constructor() {
    super();
    this.addTool(new CalculatorTool());
  }

  async execute(input: CalculatorAgentInput): Promise<CalculatorAgentOutput> {
    try {
      // Use the calculator tool to perform the calculation
      const calculatorTool = this.getTool('calculator') as CalculatorTool;
      const result = await calculatorTool.execute({ expression: input.calculation });

      return {
        result: result.result,
        calculation: input.calculation,
        explanation: `Successfully calculated: ${input.calculation} = ${result.result}`
      };
    } catch (error) {
      throw new Error(`Calculator agent failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 