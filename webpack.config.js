const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`);

const cssLoaders = extraLoader => {
    const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];

    if (extraLoader) {
        loaders.push(extraLoader);
    }

    return loaders;
};

const optimization = () => {
    const config = {};

    if (isProd) {
        config.minimize = true;
        config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
    }

    return config;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './app/main.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    plugins: [
        new ESLintPlugin(),
        new HTMLWebpackPlugin({
            template: './app/index.html',
            scriptLoading: 'blocking',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CheckerPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img'),
                    to: path.resolve(__dirname, 'dist/assets/img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    devtool: isDev ? 'source-map' : false,
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts'
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            }
        ]
    }
};
