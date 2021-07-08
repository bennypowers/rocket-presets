import { SelectMixin } from '@pwrs/mixins/select/select-mixin';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './code-copy.js';

import ButtonStyles from './button.css';
import TabsStyles from './tabs.css';
import TabStyles from './tab.css';

declare module '@pwrs/mixins/select/select-mixin' {
  export interface Item {
    dataset: DOMStringMap & Tab;
  }
}

export interface Tab {
  id: string;
  label: string;
  iconHref?: string;
  iconTemplate?: string;
}

const INSTANCES = new Set<CodeTabs>();

/**
 * @csspart tablist - container for tab buttons
 * @csspart tabpanel - container for content
 * @csspart tab - tab button
 * @csspart default-container - container for default tab
 *
 * @cssprop --code-tabs-icon-height - size of the tab icon
 * @cssprop --code-tabs-tabs-background - background for the tablist
 * @cssprop --code-tabs-justify-tabs - flex justification for tab buttons
 * @cssprop --code-tabs-background - content and selected button background
 * @cssprop --code-tabs-tabpanel-background - tabpanel background
 * @cssprop --code-tabs-min-height - tabpanel minimum height
 * @cssprop --code-tabs-selected-highlight-color - color for selected tab highlight

 * @cssprop [--code-button-background=transparent] - tab button background
 * @cssprop [--code-button-color=inherit] - tab button text color
 * @cssprop [--code-button-focus-background=hsla(0 100% 0% / 0.75)] - tab button background when focused
 * @cssprop [--code-button-focus-color=hsla(0 100% 100% / 0.75)] - tab button text color when focused
 */
@customElement('code-tabs')
export class CodeTabs extends SelectMixin(LitElement) {
  static readonly allowedChildren = ['code-tab'];

  static readonly styles = [ButtonStyles, TabsStyles];

  @state() private labels = new Map<string, Tab>();

  /** The tab buttons. */
  @queryAll('[role="tab"]') tabs: NodeListOf<HTMLButtonElement>;

  /** Which tab name to treat as default, in case the use has not yet made a selection. */
  @property({ attribute: 'default-tab' }) defaultTab: string;

  /**
   * Which tab collection to use.
   * @see {#rocket-preset-code-tabs-js}
   */
  @property() collection: string;

  constructor() {
    super();
    this.onClickTab = this.onClickTab.bind(this);
  }

  protected initialSelectedIndex = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.initialSelectedIndex = parseInt(this.getAttribute('selected-index'));
    if (this.collection)
      this.initCollection();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback?.();
    INSTANCES.delete(this);
  }

  async firstUpdated(changed: PropertyValues<this>): Promise<void> {
    this.initLabels();
    super.firstUpdated(changed);
    this.selectIndex(await this.getInitialSelectedIndex());
    this.onSelect();
  }

  updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has('collection'))
      this.initCollection();
  }

  protected async getInitialSelectedIndex(): Promise<number> {
    if (this.querySelector('[slot=default]')) return -1;
    await this.updateComplete;
    const stored = localStorage.getItem(`code-tabs-selected-${this.collection}`);
    const index =
        stored ? this.items.findIndex(x => x.dataset.id === stored)
      : this.defaultTab ? this.items.findIndex(x => x.dataset.id === this.defaultTab)
      : this.initialSelectedIndex;
    return index < 0 ? this.initialSelectedIndex : index;
  }

  private initCollection() {
    if (this.collection)
      INSTANCES.add(this);
    else
      INSTANCES.delete(this);
  }

  render(): TemplateResult {
    const items = this.items ?? [];
    return html`
      <div id="tabs" role="tablist" part="tablist">
        ${items.map(({ dataset: { id, iconHref, label } }, i) => html`
        <button role="tab" part="tab" data-id="${id}" @click="${this.onClickTab}" ?selected="${this.selectedIndex === i}">
          <img src="${ifDefined(iconHref)}" role="presentation"/>
          ${label}
        </button>
        `)}
      </div>

      <div id="tabpanel" role="tabpanel" part="tabpanel">
        <slot></slot>
        <div id="default" ?hidden="${this.selectedItem}" part="default-container">
          <slot name="default"></slot>
        </div>
      </div>
    `;
  }

  public selectId(idToSelect: string): void {
    const index =
      this.items.findIndex(({ dataset: { id } }) => id === idToSelect);
    if (index >= 0 && this.selectedIndex !== index)
      this.selectIndex(index);
  }

  /** @private */
  override onSelect(): void {
    for (const tab of this.tabs)
      tab.removeAttribute('selected');
    const tab = this.tabs[this.selectedIndex as number];
    if (!tab) return;
    tab.setAttribute('selected', '');
    const { left } = tab.getBoundingClientRect();
    this.shadowRoot.getElementById('tabs')
      .scrollTo({ behavior: 'smooth', left });
  }

  private onClickTab(event: Event & { target: HTMLButtonElement }) {
    const tabs = [...this.tabs];
    let tab = event.target;
    while (!tabs.includes(tab))
      tab = tab.parentElement as HTMLButtonElement;
    const index = [...this.tabs].indexOf(tab);
    this.selectIndex(index);
    if (this.collection) {
      const [{ dataset: { id = this.defaultTab } }] = [this.selectedItem].flat();
      localStorage.setItem(`code-tabs-selected-${this.collection}`, id);
      INSTANCES.forEach(x => x.selectId(id));
    }
    this.fire('tab-selected', event.target);
  }

  private getLabel(tag: string) {
    return this.labels.get(tag) ?? null;
  }

  protected initLabels(event?: Event): void {
    if (event) this.labels.clear();
    this.items
      .forEach(({ dataset: { id, label, iconHref, ...dataset } }: HTMLElement) => {
        const pkg: Tab = { id, label, iconHref };

        this.labels.set(pkg.id, pkg);
      });
  }
}

/**
 * @csspart content - container for tab content
 *
 * @cssprop [--code-button-background=transparent] - copy button background
 * @cssprop [--code-button-color=inherit] - copy button text color
 * @cssprop [--code-button-focus-background=hsla(0 100% 0% / 0.75)] - copy button background when focused
 * @cssprop [--code-button-focus-color=hsla(0 100% 100% / 0.75)] - copy button text color when focused
 */
@customElement('code-tab')
export class CodeTab extends LitElement {
  static readonly styles = [TabStyles];

  @property() tab: string;

  @property({ type: Boolean, attribute: 'no-copy' }) noCopy = false;

  render(): TemplateResult {
    if (this.noCopy)
      return html`<div part="content"><slot></slot></div>`;
    else
      return html`<code-copy part="content"><slot></slot></code-copy>`;
  }
}
