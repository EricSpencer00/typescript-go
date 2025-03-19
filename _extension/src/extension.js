"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("typescript-go.restart", () => {
        client.restart();
    }));
    const output = vscode.window.createOutputChannel("typescript-go", "log");
    const traceOutput = vscode.window.createOutputChannel("typescript-go (LSP)");
    const exe = context.asAbsolutePath(path.join("../", "built", "local", `tsgo${process.platform === "win32" ? ".exe" : ""}`));
    output.appendLine(`Resolved to ${exe}`);
    const config = vscode.workspace.getConfiguration("typescript-go");
    const pprofDir = config.get("pprofDir");
    const pprofArgs = pprofDir ? ["-pprofDir", pprofDir] : [];
    const serverOptions = {
        run: {
            command: exe,
            args: ["lsp", ...pprofArgs],
            transport: node_1.TransportKind.stdio,
        },
        debug: {
            command: exe,
            args: ["lsp", ...pprofArgs],
            transport: node_1.TransportKind.stdio,
        },
    };
    const clientOptions = {
        documentSelector: [
            { scheme: "file", language: "typescript" },
            { scheme: "file", language: "typescriptreact" },
            { scheme: "file", language: "javascript" },
            { scheme: "file", language: "javascriptreact" },
            { scheme: "untitled", language: "typescript" },
            { scheme: "untitled", language: "typescriptreact" },
            { scheme: "untitled", language: "javascript" },
            { scheme: "untitled", language: "javascriptreact" },
        ],
        outputChannel: output,
        traceOutputChannel: traceOutput,
        diagnosticPullOptions: {
            onChange: true,
            onSave: true,
            onTabs: true,
            match(documentSelector, resource) {
                const language = getLanguageForUri(resource);
                for (const selector of documentSelector) {
                    if (typeof selector === "string") {
                        if (selector === language) {
                            return true;
                        }
                        continue;
                    }
                    if (node_1.NotebookDocumentFilter.is(selector)) {
                        continue;
                    }
                    if (node_1.TextDocumentFilter.is(selector)) {
                        if (selector.language !== undefined && selector.language !== language) {
                            continue;
                        }
                        if (selector.scheme !== undefined && selector.scheme !== resource.scheme) {
                            continue;
                        }
                        if (selector.pattern !== undefined) {
                            throw new Error("Not implemented");
                        }
                        return true;
                    }
                }
                return false;
            },
        },
    };
    client = new node_1.LanguageClient("typescript-go", "typescript-go-lsp", serverOptions, clientOptions);
    output.appendLine(`Starting language server...`);
    client.start();
}
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
function getLanguageForUri(uri) {
    const ext = path.posix.extname(uri.path);
    switch (ext) {
        case ".ts":
        case ".mts":
        case ".cts":
            return "typescript";
        case ".js":
        case ".mjs":
        case ".cjs":
            return "javascript";
        case ".tsx":
            return "typescriptreact";
        case ".jsx":
            return "javascriptreact";
        default:
            return undefined;
    }
}
