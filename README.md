# jQuery.behaviorize

### Introduction

jQuery.behaviorize is a front-end framework for adding custom behaviors to html
elements.  When a software is being developed, it will often include supporting
functionality, which, albeit necessary, does not represent the purpose or the
identity of the written program.  Examples of extraneous features would
include user interface (UI) transformations (e.g., changing an input into a 
date-picker), data validation, and custom UI actions (e.g., giving a group of
anchors a radio-button-like behavior).  Having a simple and independent 
process to declare and link a supporting logic into a focal application would
allow the application's code to be less complex and more aligned with the 
program's purpose.  jQuery.behaviorize provides such a mechanism to define and
link the supporting features into a developed software.

### Supported Behaviors

The framework enables assigning the following behaviors to html elements:

* <u>Transformations</u> - modifiers that are applied to an element once.

* <u>Actions</u> - behaviors invoked in response to a certain events triggered on 
  a compoment.

* <u>Validations</u> - a specialized set of actions that assert whether a 
  user-provided data passes all of the specified checks.

### Mechanism of Operation

Transformations, actions, validations, and configuration are first added using 
static `$.behaviorize` function.  The behaviors are assigned to elements by 
tagging the latter with custom attributes. For example, to link some 
custom-defined `radio` action to an element, the `a-radio` attribute is added 
(e.g., `<div a-radio></div>`).  Binding behaviors to tagged elements is 
accomplished by calling `$.fn.behaviorize` on the container of the elements
(e.g., `$('body').behaviorize()` would activate the behaviors).

### Tutorial and Documenation

For more information and to get started with the framework, visit 
[jQuery.behaviorize Tutorial and Documentation](https://github.com/aptivator/jquery.behaviorize-tutorial) 
project.
