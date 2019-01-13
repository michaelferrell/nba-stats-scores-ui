# Semantic UI LESS Theming Guide

### Theming Structure

In order for theming to work properly, file and path names must mirror the structure used by semantic-ui-less. This can be found in `node_modules/semantic-ui-less/themes/default`. Our application uses the "default" theme.

Themes are made up of two files:

* .variables file
* .overrides file

A theme can include both variables and overrides, or just either one alone.

##### Variables Files

* A .variables file specifies variables which should be adjusted for a theme.
* A theme's variable file only needs to include variables which are different for a theme.

##### Override Files

* An .overrides file specifies additional CSS rules to be added to a definition for a theme.
* This file also has access to all inherited variables for a component.

### Theming a Component

Here's a basic example of how to override the default styles for a dropdown component.

* Navigate to the `modules` directory located at `src/css/semantic-ui-themes/site/modules`.
* In this directory create an `input.overrides` file and an `input.variables` file.

Let's say we wanted to reduce the padding for all dropdowns in our application.

First we need to know two things:

* The CSS selector that defines the dropdown's padding
* The name of the LESS variable that controls the padding's value.

First let's find the CSS selector.

* Open the base dropdown file located at: `node_modules/semantic-ui-less/definitions/modules/dropdown.less`
* Search for the selector named `.ui.selection.dropdown`
* Notice how the padding property uses a variable named `@selectionPadding;`

Before we override the padding with our own value, let's see how `@selectionPadding` is defined.

* Open up Semantic's `dropdown.variables` file located at `node_modules/semantic-ui-less/themes/default/modules/`
* Search for the variable named `@selectionPadding`
* It should look like `@selectionPadding: @selectionVerticalPadding @selectionIconDistance @selectionVerticalPadding @selectionHorizontalPadding;`
* This sets the padding for all sides of a dropdown.

To reduce a dropdown's top and bottom padding, we need to override the `@selectionVerticalPadding` variable.

* Open our newly created variables file located at `src/css/semantic-ui-themes/site/modules/dropdown.variables`
* Set a new padding value like so: `@selectionVerticalPadding: 0.5em;`
* Save the file and verify that your dropdown's vertical padding was reduced.

Further documentation can be found at http://learnsemantic.com/developing/customizing.html.
