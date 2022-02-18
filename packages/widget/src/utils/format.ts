import { Token } from '@lifinance/sdk';
import BigNumber from 'bignumber.js';

export const formatTokenAmount = (
  token: Token,
  amount: string | BigNumber | undefined,
) => {
  if (!amount) {
    return '0';
  }

  let floated;
  if (typeof amount === 'string') {
    if (amount === '0') {
      return amount;
    }

    floated = new BigNumber(amount).shiftedBy(-token.decimals);
  } else {
    floated = amount;

    if (floated.isZero()) {
      return '0';
    }
  }

  // show at least 4 decimal places and at least two non-zero digests
  let decimalPlaces = 3;
  // since values can in theory be negative we need to use the absolute value to determine the decimal places
  while (floated.absoluteValue().lt(1 / 10 ** decimalPlaces)) decimalPlaces++;
  return floated.toFixed(decimalPlaces + 1, 1);
};