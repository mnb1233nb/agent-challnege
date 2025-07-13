export interface CalculatorInput {
  expression: string;
}

export interface CalculatorOutput {
  result: number;
  expression: string;
  success: boolean;
  error?: string;
}

export class SimpleCalculator {
  name = 'simple-calculator';
  description = 'A simple calculator that performs basic arithmetic operations';

  async calculate(input: CalculatorInput): Promise<CalculatorOutput> {
    try {
      // Sanitize the expression to only allow safe mathematical operations
      const sanitizedExpression = input.expression.replace(/[^0-9+\-*/().\s]/g, '');
      
      // Evaluate the expression
      const result = eval(sanitizedExpression);
      
      if (typeof result !== 'number' || !isFinite(result)) {
        return {
          result: 0,
          expression: input.expression,
          success: false,
          error: 'Invalid mathematical expression'
        };
      }

      return {
        result,
        expression: input.expression,
        success: true
      };
    } catch (error) {
      return {
        result: 0,
        expression: input.expression,
        success: false,
        error: `Calculation failed: ${error instanceof Error ? error.message : 'Invalid expression'}`
      };
    }
  }
}

// Export a singleton instance
export const simpleCalculator = new SimpleCalculator(); 