export function isJSXElement(value: any): value is JSX.Element {
  return (
    value.key !== undefined &&
    value.props !== undefined &&
    value.type !== undefined
  );
}

export function getContentFromJSXElement(element: any) {
  if (!isJSXElement(element)) return element + "";

  try {
    const stack = [element];
    let content = "";

    while (stack.length > 0) {
      const cur = stack.pop()!;

      if (typeof cur === "string") {
        content += cur;
        continue;
      }
      if (cur.props.children) {
        if (typeof cur.props.children === "string") {
          stack.push(cur.props.children);
        } else if (Array.isArray(cur.props.children)) {
          for (let i = cur.props.children.length - 1; i >= 0; i--) {
            stack.push(cur.props.children[i]);
          }
        }
      }
    }

    // console.log(content);

    return content;
  } catch {
    return "";
  }
}
