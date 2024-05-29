import {rabbyKit} from "../ethereum";
import {InjectedConnector} from "@wagmi/core";
import { signMessage } from '@wagmi/core'
import axios from "axios";

import { ChainId, Token, Fetcher, Route, Trade, TokenAmount, TradeType, Percent } from '@uniswap/sdk';
import {ethers} from "ethers";

const PEPE_TOKEN_ADDRESS = "0x6982508145454ce325ddbe47a25d4ec3d2311933"
const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
const AMOUNT_IN = 1
export async function swapTokens() {
    try {
        console.log('Swapping tokens...');
        const pepeToken = new Token(ChainId.MAINNET, PEPE_TOKEN_ADDRESS, 18);
        const weth = new Token(ChainId.MAINNET, WETH_ADDRESS, 18);

        console.log('Fetching token data...');
        const pair = await Fetcher.fetchPairData(pepeToken, weth);
        const route = new Route([pair], pepeToken);
        const trade = new Trade(route, new TokenAmount(pepeToken, AMOUNT_IN), TradeType.EXACT_INPUT);

        console.log('Calculating slippage tolerance...');

        const slippageTolerance = new Percent('50', '10000'); // 0.5%
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();
        const path = [pepeToken.address, weth.address];
        const to = account.address;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now


        console.log('Swapping tokens...');
        const uniswapRouterAbi = [
            'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        ];
        const uniswapRouterAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
        const uniswapRouterContract = new ethers.Contract(uniswapRouterAddress, uniswapRouterAbi);

        const data = uniswapRouterContract.methods.swapExactTokensForETH(
            AMOUNT_IN,
            amountOutMin,
            path,
            to,
            deadline
        ).encodeABI();

        const tx = {
            from: account.address,
            to: uniswapRouterAddress,
            data,
            gas: await web3.eth.estimateGas({ from: account.address, to: uniswapRouterAddress, data }),
            gasPrice: await web3.eth.getGasPrice(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
    } catch (error) {
        console.error('Error swapping tokens:', error);
    }
}
