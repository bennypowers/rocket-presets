import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import ButtonStyles from './button.css';
import CopyStyles from './copy.css';

const supportsClipboard = 'clipboard' in navigator;

/**
 * @csspart copy-button - copy button
 * @cssprop [--code-button-background=transparent] - button background
 * @cssprop [--code-button-color=inherit] - button text color
 * @cssprop [--code-button-focus-background=hsla(0 100% 0% / 0.75)] - button background when focused
 * @cssprop [--code-button-focus-color=hsla(0 100% 100% / 0.75)] - button text color when focused
 *
 * @slot copy-icon - Button content
 * @slot success-icon - Button content which alerts on copying. Use `role="alert"` if overriding default.
 * @event {CustomEvent<string>} copy - when successfully copying
 */
@customElement('code-copy')
export class CodeCopy extends LitElement {
  static readonly is = 'code-copy';

  static readonly styles = [ButtonStyles, CopyStyles];

  static copyIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <!-- Copyright Github, license MIT -->
      <path fill-rule="evenodd" d="M5.962 2.513a.75.75 0 01-.475.949l-.816.272a.25.25 0 00-.171.237V21.25c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V3.97a.25.25 0 00-.17-.236l-.817-.272a.75.75 0 01.474-1.424l.816.273A1.75 1.75 0 0121 3.97v17.28A1.75 1.75 0 0119.25 23H4.75A1.75 1.75 0 013 21.25V3.97a1.75 1.75 0 011.197-1.66l.816-.272a.75.75 0 01.949.475z"/>
      <path fill-rule="evenodd" d="M7 1.75C7 .784 7.784 0 8.75 0h6.5C16.216 0 17 .784 17 1.75v1.5A1.75 1.75 0 0115.25 5h-6.5A1.75 1.75 0 017 3.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-6.5z"/>
    </svg>
  `;

  @state() success = 'pending';

  @property({ type: Number }) timeout = 2000;

  render(): TemplateResult {
    return html`
      <slot></slot>

      <button id="copy-button" part="copy-button"
          @click="${this.onCopy}"
          ?hidden="${!supportsClipboard}">
        <div part="copy-icon" aria-hidden="${this.success === 'copied'}">
          <slot name="copy-icon">
            <div aria-label="copy">${CodeCopy.copyIcon}</div>
          </slot>
        </div>
        <div part="success-icon" aria-hidden="${this.success !== 'copied'}">
          <slot name="success-icon">
            <div aria-label="copied" role="alert">${CodeCopy.copyIcon}</div>
          </slot>
        </div>
      </button>
    `;
  }

  async onCopy(): Promise<void> {
    const { textContent } = this;
    await navigator.clipboard.writeText(textContent.trim());
    this.success = 'copied';
    this.dispatchEvent(new CustomEvent('copy', { detail: textContent }));
    setTimeout(() => {
      this.success = 'pending';
    }, this.timeout);
  }
}
