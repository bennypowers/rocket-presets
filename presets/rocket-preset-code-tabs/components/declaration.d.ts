import { CSSResult } from 'lit';

declare module '*.css' {
  const styles: CSSResult;
  export default styles;
}
