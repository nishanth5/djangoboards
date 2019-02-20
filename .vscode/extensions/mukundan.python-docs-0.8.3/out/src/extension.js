'use strict';
var vscode = require('vscode');
function activate(context) {
    var BrowserContentProvider = (function () {
        function BrowserContentProvider() {
        }
        BrowserContentProvider.prototype.provideTextDocumentContent = function (uri, token) {
            var html = "\n            <!DOCTYPE html>\n            <html lang=\"en\">\n            <head>\n                <style>\n                    body, html\n                    {\n                        margin: 0; padding: 0; height: 100%; overflow: hidden;\n                    }\n                </style>\n            </head>\n            <body>\n                <iframe width=\"100%\" height=\"100%\" src=\"" + uri + "\" frameborder=\"0\">\n                    <p>can't display " + uri + "</p>\n                </iframe>\n            </body>\n            </html>\n            ";
            return html;
        };
        return BrowserContentProvider;
    }());
    var provider = new BrowserContentProvider();
    var registrationHTTPS = vscode.workspace.registerTextDocumentContentProvider('https', provider);
    var disposable = vscode.commands.registerCommand('extension.openPythonDocs', function () {
        var opts = ['3.7', '3.6', '3.5', '3.4', '3.3', '2.7'];
        vscode.window.showQuickPick(opts).then(function (version) {
            var uri = vscode.Uri.parse("https://docs.python.org/" + version);
            // Determine column to place browser in.
            var col;
            var ae = vscode.window.activeTextEditor;
            if (ae != undefined) {
                col = ae.viewColumn || vscode.ViewColumn.One;
            }
            else {
                col = vscode.ViewColumn.One;
            }
            return vscode.commands.executeCommand('vscode.previewHtml', uri, col).then(function (success) {
            }, function (reason) {
                vscode.window.showErrorMessage(reason);
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map