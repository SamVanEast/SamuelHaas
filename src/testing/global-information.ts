import { height, offsetTop, width } from '../ts/globalInformation';

/**
 * Resets the shared layout measurements between tests,
 * because they live in module-level objects.
 */
export function resetGlobalInformation(): void {
  for (const key of Object.keys(height)) {
    height[key] = 0;
  }
  for (const key of Object.keys(offsetTop)) {
    offsetTop[key] = 0;
  }
  width.length = 0;
}
