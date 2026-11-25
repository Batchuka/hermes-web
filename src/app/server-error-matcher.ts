import { ErrorStateMatcher } from '@angular/material/core';

export function whenServerRefuses(hasError: () => boolean): ErrorStateMatcher {
  return { isErrorState: () => hasError() };
}
