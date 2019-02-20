# Python Test Explorer for Visual Studio Code

[![Build Status](https://travis-ci.com/kondratyev-nv/vscode-python-test-adapter.svg?branch=master)](https://travis-ci.com/kondratyev-nv/vscode-python-test-adapter)
[![Build Status](https://dev.azure.com/kondratyev-nv/Python%20Test%20Explorer%20for%20Visual%20Studio%20Code/_apis/build/status/Python%20Test%20Explorer%20for%20Visual%20Studio%20Code%20CI?branchName=master)](https://dev.azure.com/kondratyev-nv/Python%20Test%20Explorer%20for%20Visual%20Studio%20Code/_build/latest?definitionId=1&branchName=master)
[![Dependencies Status](https://david-dm.org/kondratyev-nv/vscode-python-unittest-adapter/status.svg)](https://david-dm.org/kondratyev-nv/vscode-python-unittest-adapter)

This extension allows you to run your Python [Unittest](https://docs.python.org/3/library/unittest.html#module-unittest) 
or [Pytest](https://docs.pytest.org/en/latest/)
tests with the [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer).

![Screenshot](https://github.com/kondratyev-nv/vscode-python-test-adapter/raw/master/img/screenshot.png)

## Features
* Shows a Test Explorer in the Test view in VS Code's sidebar with all detected tests and suites and their state
* Shows a failed test's log when the test is selected in the explorer
* Supports multi-root workspaces
* Supports Unittest and Pytest test frameworks

## Getting started
* Install the extension
* Configure Python extension for Visual Studio Code to discover your tests 
  (see [Configuration section](#configuration) and documentation of a test framework of your choice
  ([Unittest documentation](https://docs.python.org/3/library/unittest.html#module-unittest), 
   [Pytest](https://docs.pytest.org/en/latest/getting-started.html))
* Reload VS Code and open the Test view
* Run your tests using the ![Run](https://github.com/kondratyev-nv/vscode-python-test-adapter/raw/master/img/run-button.png) icon in the Test Explorer

## Configuration

By default the extension uses the configuration from [Python extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python).
To configure Python for your project see [Getting Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial).

However, test framework used by this extension can be overridden by `pythonTestExplorer.testFramework` configuration property.
Right now, the two available option are `unittest` and `pytest`. When property is set to `null`, the configuration from Python extension is used.

List of currently used properties:

Property                          | Description
----------------------------------|---------------------------------------------------------------
`python.pythonPath`               | Path to Python
`python.unitTest.cwd`             | Optional working directory for unit tests
`python.unitTest.unittestEnabled` | Whether to enable or disable unit testing using unittest (enables or disables test discovery for Test Explorer)
`python.unitTest.unittestArgs`    | Arguments used for test discovery (currently only `-s` and `-p` arguments are considered)
`python.unitTest.pyTestEnabled`   | Whether to enable or disable unit testing using pytest (enables or disables test discovery for Test Explorer)
`python.unitTest.pyTestArgs`      | Arguments passed to the pytest. Each argument is a separate item in the array.
`python.envFile`                  | Path to environment variable definitions file
`pythonTestExplorer.testFramework`| Test framework to use (overrides Python extension properties `python.unitTest.unittestEnabled` and `python.unitTest.pyTestEnabled`)

Configuration supports placeholders for workspace folder as `${workspaceFolder}` and environment variables in a form of `${env:YOUR_ENVIRONMENT_VARIABLE}`.

## Troubleshooting

Whether no tests were discovered in the Test Explorer view or anything else doesn't work as expected, you can see logging output selecting `Python Test Adapter Log` in the Output section.

## Questions, issues, feature requests, and contributions

* If you have any question or a problem with the extension, please [file an issue](https://github.com/kondratyev-nv/vscode-python-test-adapter/issues).
* Contributions are always welcome! Please see [contributing guide](https://github.com/kondratyev-nv/vscode-python-test-adapter/blob/master/CONTRIBUTING.md) for more details.
