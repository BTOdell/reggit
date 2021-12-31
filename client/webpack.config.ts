import {cpus} from "os";
import {resolve} from "path";
import type {Configuration} from "webpack";
import {EnvironmentPlugin} from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlInlineScriptWebpackPlugin = require("html-inline-script-webpack-plugin");

export = (env: unknown, argv: { mode: string }): Configuration => {
    const dev: boolean = argv.mode == null || argv.mode === "development";

    const inputPath = resolve(__dirname, "src");
    const outputPath = resolve(__dirname, "dist");

    const plugins: Configuration["plugins"] = [];

    if (!dev) {
        plugins.push(new EnvironmentPlugin({
            NODE_ENV: "production",
            DEBUG: false,
        }));
    }

    const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
        filename: resolve(outputPath, "index.html"),
        template: "index.html",
        inject: "body",
    };
    plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));
    plugins.push(new HtmlInlineScriptWebpackPlugin());

    return {
        mode: dev ? "development" : "production",
        context: inputPath,
        entry: [
            "./index.tsx",
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".scss"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        configFile: resolve(inputPath, "tsconfig.json"),
                        projectReferences: true,
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    auto: true,
                                    localIdentName: dev ? "[name]__[local]" : "[hash:base64]",
                                    exportLocalsConvention: "camelCaseOnly",
                                },
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: "url-loader",
                    },
                },
            ],
        },
        plugins,
        target: "web",
        parallelism: cpus().length,
        output: {
            path: resolve(__dirname, "dist"),
            publicPath: "/",
            filename: dev ? "bundle.js?[fullhash]" : "bundle.js",
        },
    };
};
