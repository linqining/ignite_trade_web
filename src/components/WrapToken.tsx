import WormholeConnect, {
    type config,
    WormholeConnectTheme,
} from '@wormhole-foundation/wormhole-connect';


export function WrapToken () {
    const config: config.WormholeConnectConfig = {
        // Define the network
        network: 'Testnet',

        // Define the chains
        chains: [ 'Solana','Ethereum',"Pythnet"],

        // rpcs: {
        // 	Solana: 'https://mainnet.helius-rpc.com/?api-key=KEY'
        // },
        // UI configuration
        ui: {
            title: 'Bridge Token',
        },
    };

    const theme: WormholeConnectTheme = {
        mode: 'dark',
        primary: '#78c4b6',
    };

    return <WormholeConnect config={config} theme={theme} />;
}