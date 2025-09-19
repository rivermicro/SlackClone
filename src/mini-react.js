const TEXT_ELEMENT = 'TEXT_ELEMENT';
const FRAGMENT = Symbol('fragment');

const hookState = new Map();
let currentPath = 'root';
let hookCursor = 0;
let currentRoot = null;

function createElement(type, props, ...children) {
  const normalizedChildren = [];
  children.flat().forEach((child) => {
    if (child === false || child === true || child == null) {
      return;
    }
    if (Array.isArray(child)) {
      normalizedChildren.push(...child);
    } else if (typeof child === 'object') {
      normalizedChildren.push(child);
    } else {
      normalizedChildren.push(createTextElement(child));
    }
  });

  const finalProps = { ...(props || {}), children: normalizedChildren };
  return { type, props: finalProps };
}

function createTextElement(value) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: value != null ? value.toString() : '',
      children: [],
    },
  };
}

function setCurrentComponentPath(path) {
  currentPath = path;
  hookCursor = 0;
}

function getHookKey(index) {
  return `${currentPath}:${index}`;
}

function renderRoot(element, container) {
  currentRoot = { element, container };
  container.innerHTML = '';
  const dom = instantiate(element, 'root');
  if (dom) {
    container.appendChild(dom);
  }
}

function rerender() {
  if (!currentRoot) {
    return;
  }
  renderRoot(currentRoot.element, currentRoot.container);
}

function instantiate(element, path) {
  if (element == null) {
    return null;
  }

  if (typeof element.type === 'function') {
    const previousPath = currentPath;
    const previousCursor = hookCursor;
    setCurrentComponentPath(path);
    const result = element.type({ ...(element.props || {}) });
    const dom = instantiate(result, path);
    currentPath = previousPath;
    hookCursor = previousCursor;
    return dom;
  }

  if (element.type === FRAGMENT) {
    const fragment = document.createDocumentFragment();
    element.props.children.forEach((child, index) => {
      const childDom = instantiate(child, `${path}.${index}`);
      if (childDom) {
        fragment.appendChild(childDom);
      }
    });
    return fragment;
  }

  if (element.type === TEXT_ELEMENT) {
    return document.createTextNode(element.props.nodeValue);
  }

  const dom = document.createElement(element.type);
  updateDomProperties(dom, element.props || {});

  const children = element.props?.children || [];
  children.forEach((child, index) => {
    const childDom = instantiate(child, `${path}.${index}`);
    if (childDom) {
      dom.appendChild(childDom);
    }
  });

  return dom;
}

const isEvent = (name) => /^on/.test(name);
const isStyleObject = (value) => value && typeof value === 'object';

function updateDomProperties(dom, props) {
  Object.entries(props).forEach(([name, value]) => {
    if (name === 'children' || value == null) {
      return;
    }

    if (isEvent(name) && typeof value === 'function') {
      const eventName = name.slice(2).toLowerCase();
      dom.addEventListener(eventName, value);
      return;
    }

    if (name === 'className') {
      dom.setAttribute('class', value);
      return;
    }

    if (name === 'style' && isStyleObject(value)) {
      Object.entries(value).forEach(([styleName, styleValue]) => {
        dom.style[styleName] = styleValue;
      });
      return;
    }

    if (name in dom) {
      try {
        dom[name] = value;
        return;
      } catch (error) {
        // fall back to attribute assignment below
      }
    }

    dom.setAttribute(name, value);
  });
}

function useState(initialValue) {
  const key = getHookKey(hookCursor);
  if (!hookState.has(key)) {
    hookState.set(key, { value: initialValue });
  }
  const stateRecord = hookState.get(key);
  const setState = (value) => {
    const previous = stateRecord.value;
    const next = typeof value === 'function' ? value(previous) : value;
    if (Object.is(previous, next)) {
      return;
    }
    stateRecord.value = next;
    rerender();
  };
  hookCursor += 1;
  return [stateRecord.value, setState];
}

function useMemo(factory, deps = []) {
  const key = getHookKey(hookCursor);
  if (!hookState.has(key)) {
    hookState.set(key, { value: factory(), deps: Array.isArray(deps) ? [...deps] : null });
  } else {
    const record = hookState.get(key);
    if (!Array.isArray(deps)) {
      record.value = factory();
    } else if (!record.deps || deps.length !== record.deps.length || deps.some((dep, index) => dep !== record.deps[index])) {
      record.value = factory();
      record.deps = [...deps];
    }
  }
  const result = hookState.get(key).value;
  hookCursor += 1;
  return result;
}

function useRef(initialValue) {
  const key = getHookKey(hookCursor);
  if (!hookState.has(key)) {
    hookState.set(key, { value: { current: initialValue } });
  }
  const ref = hookState.get(key).value;
  hookCursor += 1;
  return ref;
}

const React = {
  createElement,
  Fragment: FRAGMENT,
  useState,
  useMemo,
  useRef,
  __renderRoot: renderRoot,
};

export default React;
export { createElement, useState, useMemo, useRef, renderRoot, FRAGMENT as Fragment };
