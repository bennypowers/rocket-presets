import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import ButtonStyles from './button.css';
import CopyStyles from './copy.css';

const supportsClipboard = 'clipboard' in navigator;

/**
 * @csspart copy-button - copy button
 * @cssprop [--code-button-background=transparent] - button background
 * @cssprop [--code-button-color=inherit] - button text color
 * @cssprop [--code-button-focus-background=hsla(0 100% 0% / 0.75)] - button background when focused
 * @cssprop [--code-button-focus-color=hsla(0 100% 100% / 0.75)] - button text color when focused
 */
@customElement('code-copy')
export class CodeCopy extends LitElement {
  static readonly is = 'code-copy';

  static readonly styles = [ButtonStyles, CopyStyles];

  @state() copyButtonText = 'Copy';

  render(): TemplateResult {
    return html`
      <slot></slot>

      <button id="copy-button"
          part="copy-button"
          @click="${this.onCopy}"
          ?hidden="${!supportsClipboard}">
        ${this.copyButtonText}
      </button>
    `;
  }

  async onCopy(): Promise<void> {
    const { textContent } = this;
    await navigator.clipboard.writeText(textContent.trim());
    this.copyButtonText = 'Copied ✅';
    setTimeout(() => {
      this.copyButtonText = 'Copy';
    }, 2000);
  }
}
