import { visit } from 'unist-util-visit';

function toAttr(attr, value) {
  return (
      !value ? ''
    : value === true ? attr
    : `${attr}="${value}"`
  );
}

export function markdownDirectives({ page, rocketConfig, ...config }) {
  return function transformer(tree, file, next) {
    visit(tree, 'code', function markdownDirectives(node, index, parent) {
      // eslint-disable-next-line easy-loops/easy-loops
      for (const [command, fn] of Object.entries(config)) {
        if (typeof node.meta === 'string') {
          const [directive, ...args] = node.meta
            .split(' ')
            .map(x => x.trim());

          if (directive === command) {
            if (typeof fn !== 'function')
              throw new Error('Wrapper function must be a function');

            const { attributes, tagName, textContent } =
              fn(args, { node, page, parent, rocketConfig });

            const attrs = Object.entries(attributes ?? {})
              .reduce((acc, [attr, value]) =>
                `${acc} ${toAttr(attr, value)}`, '');

            const contentNode = textContent ? { type: 'text', value: textContent } : node;

            node = {
              type: 'root',
              children: [
                { type: 'html', value: `<${tagName}${attrs}>` },
                { type: 'text', value: '\n\n' },
                contentNode,
                { type: 'text', value: '\n\n' },
                { type: 'html', value: `</${tagName}>` },
              ],
            };

            parent.children.splice(index, 1, node);
          }
        }
      }
    });

    if (typeof next === 'function')
      return next(null, tree, file);
    else
      return tree;
  };
}
