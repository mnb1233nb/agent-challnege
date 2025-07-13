import { Workflow } from '@mastra/core';
import { CalculatorAgent } from './calculator-agent';

export interface CalculatorWorkflowInput {
  calculations: string[];
}

export interface CalculatorWorkflowOutput {
  results: Array<{
    calculation: string;
    result: number;
    explanation: string;
  }>;
}

export class CalculatorWorkflow extends Workflow<CalculatorWorkflowInput, CalculatorWorkflowOutput> {
  name = 'calculator-workflow';
  description = 'A workflow that performs multiple calculations using the calculator agent';

  constructor() {
    super();
    this.addAgent(new CalculatorAgent());
  }

  async execute(input: CalculatorWorkflowInput): Promise<CalculatorWorkflowOutput> {
    const calculatorAgent = this.getAgent('calculator-agent') as CalculatorAgent;
    const results = [];

    for (const calculation of input.calculations) {
      try {
        const result = await calculatorAgent.execute({ calculation });
        results.push({
          calculation: result.calculation,
          result: result.result,
          explanation: result.explanation
        });
      } catch (error) {
        results.push({
          calculation,
          result: NaN,
          explanation: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    }

    return { results };
  }
} 