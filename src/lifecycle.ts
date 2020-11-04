import { Component } from '@angular/core';
import { LifeCycle } from './lifecycle.enum';
import { LifeCycleFn, BaseMixinComponent, ComponentClass } from './types';
import { registerLifecycleFn } from './utils';
import { createMixinComponent, setAugmentationFn } from './component';

const createLifecycleMixinFn = (method: LifeCycle) => (
  component: BaseMixinComponent | Component,
  fn: LifeCycleFn,
  providers = []
) => {
  let definition: ComponentClass;

  if (
    component &&
    typeof component === 'function' &&
    component.prototype instanceof BaseMixinComponent
  ) {
    definition = component as ComponentClass;
  } else {
    definition = createMixinComponent(component);
  }

  registerLifecycleFn(definition as any, method, fn, providers);

  return definition;
};

export const onInit = createLifecycleMixinFn(LifeCycle.INIT);
export const onChanges = createLifecycleMixinFn(LifeCycle.CHANGES);
export const doCheck = createLifecycleMixinFn(LifeCycle.CHECK);
export const afterContentInit = createLifecycleMixinFn(LifeCycle.CONTENT_INIT);
export const afterContentChecked = createLifecycleMixinFn(
  LifeCycle.CONTENT_CHECKED
);
export const afterViewInit = createLifecycleMixinFn(LifeCycle.VIEW_INIT);
export const afterViewChecked = createLifecycleMixinFn(LifeCycle.VIEW_CHECKED);

const AUGMENTATIONS = {
  onInit: function (fn: LifeCycleFn, providers?: any[]) {
    return onInit(this, fn, providers);
  },

  onChanges: function (fn: LifeCycleFn, providers?: any[]) {
    return onChanges(this, fn, providers);
  },

  doCheck: function (fn: LifeCycleFn, providers?: any[]) {
    return doCheck(this, fn, providers);
  },

  afterContentInit: function (fn: LifeCycleFn, providers?: any[]) {
    return afterContentInit(this, fn, providers);
  },

  afterContentChecked: function (fn: LifeCycleFn, providers?: any[]) {
    return afterContentChecked(this, fn, providers);
  },

  afterViewInit: function (fn: LifeCycleFn, providers?: any[]) {
    return afterViewInit(this, fn, providers);
  },

  afterViewChecked: function (fn: LifeCycleFn, providers?: any[]) {
    return afterViewChecked(this, fn, providers);
  },

  setComponent: function (component: Component) {
    return Component(component)(this);
  },
};

setAugmentationFn(
  (target: any): ComponentClass => Object.assign(target, AUGMENTATIONS)
);
