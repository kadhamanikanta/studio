'use server';

/**
 * @fileOverview An AI agent that suggests a reasonable bid increment for an auction item.
 *
 * - suggestBidIncrement - A function that suggests a bid increment.
 * - SuggestBidIncrementInput - The input type for the suggestBidIncrement function.
 * - SuggestBidIncrementOutput - The return type for the suggestBidIncrement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBidIncrementInputSchema = z.object({
  currentBid: z.number().describe('The current highest bid for the item.'),
  itemValue: z.number().describe('The estimated fair market value of the item.'),
  bidderStrategy: z
    .string()
    .describe(
      'The bidders strategy, for example whether they want to bid aggressively or conservatively.'
    )
    .optional(),
});
export type SuggestBidIncrementInput = z.infer<typeof SuggestBidIncrementInputSchema>;

const SuggestBidIncrementOutputSchema = z.object({
  suggestedIncrement: z
    .number()
    .describe(
      'The suggested bid increment, which should be a reasonable amount based on the current bid and item value.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested increment, including factors considered.'
    ),
});
export type SuggestBidIncrementOutput = z.infer<typeof SuggestBidIncrementOutputSchema>;

export async function suggestBidIncrement(
  input: SuggestBidIncrementInput
): Promise<SuggestBidIncrementOutput> {
  return suggestBidIncrementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBidIncrementPrompt',
  input: {schema: SuggestBidIncrementInputSchema},
  output: {schema: SuggestBidIncrementOutputSchema},
  prompt: `You are an expert auction advisor. Given the current bid, the item's value, and the bidder's strategy, suggest a reasonable bid increment.

Current Bid: {{{currentBid}}}
Item Value: {{{itemValue}}}
Bidder Strategy: {{{bidderStrategy}}}

Consider factors such as the current bid as a percentage of item value, bidder strategy, and typical bidding increments for similar items.

Provide a suggested increment and a brief explanation of your reasoning.
`,
});

const suggestBidIncrementFlow = ai.defineFlow(
  {
    name: 'suggestBidIncrementFlow',
    inputSchema: SuggestBidIncrementInputSchema,
    outputSchema: SuggestBidIncrementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
