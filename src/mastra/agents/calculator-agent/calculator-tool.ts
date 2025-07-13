import { Tool } from '@mastra/core';

export interface CalculatorInput {
  expression: string;
}

export interface CalculatorOutput {
  result: number;
  expression: string;
}

export class CalculatorTool extends Tool<CalculatorInput, CalculatorOutput> {
  name = 'calculator';
  description = 'Performs basic arithmetic calculations';

  async execute(input: CalculatorInput): Promise<CalculatorOutput> {
    try {
      // Sanitize the expression to only allow safe mathematical operations
      const sanitizedExpression = input.expression.replace(/[^0-9+\-*/().\s]/g, '');
      
      // Evaluate the expression
      const result = eval(sanitizedExpression);
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Invalid mathematical expression');
      }

      return {
        result,
        expression: input.expression
      };
    } catch (error) {
      throw new Error(`Calculation failed: ${error instanceof Error ? error.message : 'Invalid expression'}`);
    }
  }
} 